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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          .from('car')
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
      } catch (err: any) {
        console.error("Error in data fetching:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <section className="flex flex-col min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Log ตรวจป้ายทะเบียน</h1>
      
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
            
            {data && data.length > 0 ? (
              <>
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
                    {data.map((car, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{car.plate_number}</td>
                        <td className="px-4 py-2 border">{car.city}</td>
                        <td className="px-4 py-2 border">{formatTimestamp(car.detected_at)}</td>
                        <td className="px-4 py-2 border">{renderImage(car.image_data)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">Raw JSON Data:</h3>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                    {JSON.stringify(data?.map(item => ({
                      ...item,
                      image_data: item.image_data ? '[BASE64_DATA]' : null
                    })), null, 2)}
                  </pre>
                </div>
              </>
            ) : (
              <p className="text-gray-500 italic">ไม่มีรถที่ถูก Log ในเวลานี้.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}