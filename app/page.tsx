"use client"

import { useEffect, useState } from "react";
import '../styles/globals.css';
import { createClient } from '@supabase/supabase-js';

// Define the car data type
interface CarData {
  plate_number: string;
  city: string;
  detected_at: string;
  image_data: string | null;
}

export default function Home() {
  const [data, setData] = useState<CarData[] | null>(null);
  const [filteredData, setFilteredData] = useState<CarData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check for environment variables
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        console.log("Environment variables loaded:", { 
          urlAvailable: !!supabaseUrl, 
          keyAvailable: !!supabaseKey 
        });
        
        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Supabase credentials missing. Check your environment variables.");
        }
        
        // Initialize Supabase client
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Perform query - now including image_data column
        console.log("Attempting to fetch data from car table...");
        const { data: carData, error: supabaseError } = await supabase
          .from('car_in')
          .select('plate_number, city, detected_at, image_data')
          .order('detected_at', { ascending: false }); // Show newest first
        
        if (supabaseError) {
          console.error("Supabase error:", supabaseError);
          throw new Error(`Supabase query error: ${supabaseError.message}`);
        }
        
        console.log("Data fetched successfully:", carData);
        
        if (!carData || carData.length === 0) {
          console.warn("No data found in the car table");
        }
        
        setData(carData);
        setFilteredData(carData); // Initialize filtered data with all data
      } catch (err: any) {
        console.error("Error in data fetching:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply date filters when start or end date changes
  useEffect(() => {
    if (!data) return;

    const filtered = data.filter(car => {
      const carDate = car.detected_at.split('T')[0];
      
      // If no start date or end date is set, include all records
      if (!startDate && !endDate) return true;
      
      // If only start date is set
      if (startDate && !endDate) {
        return carDate >= startDate;
      }
      
      // If only end date is set
      if (!startDate && endDate) {
        return carDate <= endDate;
      }
      
      // If both start and end dates are set
      return carDate >= startDate && carDate <= endDate;
    });
    
    setFilteredData(filtered);
  }, [data, startDate, endDate]);

  const handleFilterReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(data);
  };

  const formatTimestamp = (timestamptz: string) => {
    if (!timestamptz) return "N/A";
    
    try {
      // Parse the ISO timestamp string directly
      // Format: "2023-05-18T17:30:45.123+00:00" -> "2023-05-18 17:30:45"
      
      // First, remove any timezone offset (+00:00 or similar)
      const withoutTimezone = timestamptz.replace(/(\+|-)[0-9]{2}:[0-9]{2}$/, '');
      
      // Split by 'T' to separate date and time
      const [datePart, timeWithExtra] = withoutTimezone.split('T');
      
      // Get just the time portion (remove milliseconds)
      const timePart = timeWithExtra ? timeWithExtra.split('.')[0] : '';
      
      // Return formatted date and time
      return `${datePart} ${timePart}`;
    } catch (err) {
      console.error("Error formatting date:", err);
      return timestamptz; // Return the raw value if formatting fails
    }
  };

  // Helper function to render base64 image
  const renderImage = (base64Data: string | null) => {
    if (!base64Data) return <span className="text-gray-400">No image</span>;
    
    try {
      // Check if the base64 string already includes the data URL prefix
      const imageSource = base64Data.startsWith('data:image') 
        ? base64Data 
        : `data:image/jpeg;base64,${base64Data}`;
      
      return (
        <div className="w-40 h-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageSource} 
            alt="Car image" 
            className="max-w-full h-auto object-cover rounded border border-gray-300" 
            onClick={() => window.open(imageSource, '_blank')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      );
    } catch (err) {
      console.error("Error rendering image:", err);
      return <span className="text-red-500">Image error</span>;
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - using hidden class instead of w-0 */}
      <aside className={`w-64 bg-white shadow-lg h-screen sticky top-0 z-10 ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="p-4 h-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 text-gray-800">ตัวกรองข้อมูล</h2>
          
          {/* Date Filter UI in Sidebar */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-gray-700">ค้นหาตามวันที่</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เริ่มวันที่
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ถึงวันที่
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button 
                onClick={handleFilterReset}
                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors"
              >
                รีเซ็ต
              </button>
            </div>
          </div>

          {/* Filter statistics */}
          {!loading && data && (
            <div className="mt-8 p-3 bg-blue-50 rounded-md text-sm">
              <p className="text-blue-800 font-medium">สถิติ</p>
              <div className="mt-2 text-gray-600">
                <p>จำนวนทั้งหมด: {data.length} รายการ</p>
                <p>จำนวนที่แสดง: {filteredData?.length || 0} รายการ</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Log ตรวจป้ายทะเบียน</h1>
          
          {/* Toggle Sidebar Button */}
          <button 
            onClick={toggleSidebar}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors text-sm flex items-center"
          >
            {sidebarOpen ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                ซ่อนตัวกรอง
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                แสดงตัวกรอง
              </>
            )}
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-lg">Loading data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">Error: {error}</p>
              <p className="text-sm text-red-600 mt-2">
                Check your browser console for more details.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">ตาราง Data ของรถยนต์:</h2>
              
              {filteredData && filteredData.length > 0 ? (
                <>
                  <div className="text-sm text-gray-500 mb-2">
                    แสดงผล {filteredData.length} รายการ {data && data.length !== filteredData.length ? `(จาก ${data.length} รายการทั้งหมด)` : ''}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 mt-4">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 border">เลขทะเบียน</th>
                          <th className="px-4 py-2 border">เมือง</th>
                          <th className="px-4 py-2 border">เวลาที่เข้า</th>
                          <th className="px-4 py-2 border">รูป</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((car_in, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{car_in.plate_number}</td>
                            <td className="px-4 py-2 border">{car_in.city}</td>
                            <td className="px-4 py-2 border">{formatTimestamp(car_in.detected_at)}</td>
                            <td className="px-4 py-2 border">{renderImage(car_in.image_data)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">Raw JSON Data:</h3>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                      {JSON.stringify(filteredData?.map(item => ({
                        ...item,
                        image_data: item.image_data ? '[BASE64_DATA]' : null
                      })), null, 2)}
                    </pre>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 italic">ไม่มีรถที่ถูก Log ในช่วงเวลาที่เลือก</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}