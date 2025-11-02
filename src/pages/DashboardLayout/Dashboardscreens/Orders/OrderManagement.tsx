import React, { useEffect, useState } from "react";
import { GetAllOrders, GetByOrderStatus, GetSearchByOrders } from "../../../../services/apiHelpers";
import Header from "./Header";
import OrderCard from "./OrderCard";
import OrderFilterTabs from "./OrderFilterTabs";
import DateRangePicker from "../../../../components/CustomCalendar/DateRangePicker";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import NewOrderPopup from "../../../../components/NewOrderPopup";

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const merchantId = useSelector((state: RootState) => state.user.merchantId);
   const [showPopup, setShowPopup] = useState(false);

  const handleNewOrder = () => {
    setShowPopup(true);
  }

  // 🟢 Fetch all orders
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await GetAllOrders(Number(merchantId));
        if (response?.data?.orders) {
          setAllOrders(response.data.orders);
          setFilteredOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };
    if (merchantId) fetchAllOrders();
  }, [merchantId]);

  // 🟣 Fetch orders by status
  useEffect(() => {
    const fetchOrdersByStatus = async () => {
      if (activeTab === "All Orders") {
        setFilteredOrders(allOrders);
        return;
      }
      try {
        const response = await GetByOrderStatus(activeTab);
        if (response?.data?.orders) {
          setFilteredOrders(response.data.orders);
        } else {
          setFilteredOrders([]);
        }
      } catch (error) {
        setFilteredOrders([]);
      }
    };
    fetchOrdersByStatus();
  }, [activeTab]);

  // 🔍 Debounced search logic
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await GetSearchByOrders(merchantId,searchQuery);
        if (response?.data?.orders) {
          setSearchResults(response.data.orders);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // 🧩 Determine what to show (search results > status filter > all)
  const displayedOrders =
    searchQuery.trim().length > 0 ? searchResults : filteredOrders;

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        orders={allOrders}
        onSearchQueryChange={(query) => setSearchQuery(query)} // ← gets search input
      />
       <button
        onClick={handleNewOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Simulate New Order
      </button>

      <div className="flex-1 flex flex-col p-3 overflow-hidden">
        {/* Tabs + Date Picker */}
        {!searchQuery && <div className="bg-white rounded-lg shadow-md border-b border-gray-200 p-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex-1 w-full">
            <OrderFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={{}} />
          </div>
          <div className="w-full md:w-auto self-start md:self-auto">
            <DateRangePicker />
          </div>
        </div>}

        {/* Orders Grid */}
        <div className="flex-1 overflow-y-auto mt-3">
          {loading ? (
            <p className="text-center text-gray-500 py-10">Searching orders...</p>
          ) : displayedOrders.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No orders found {searchQuery ? `for "${searchQuery}"` : ""}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
        {showPopup && (
        <NewOrderPopup
          order={{ id: 101, customerName: "Ravi", total: 299 }}
          onAccept={(id) => console.log("✅ Accepted Order:", id)}
          onReject={(id) => console.log("❌ Rejected Order:", id)}
          onClose={() => setShowPopup(false)} 
          autoAcceptTime={10}
        />
      )}
    </div>
  );
};

export default OrderManagement;
