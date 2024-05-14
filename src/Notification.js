import {
    useAuthenticatedKnockClient,
    useNotifications,
    
  } from "@knocklabs/react";
  import create from "zustand";
  import { useEffect } from "react";
  
 export const NotificationFeed = () => {
    const knockClient = useAuthenticatedKnockClient(
        'pk_test_1e__GCNKN1VHetWRdSGWEE2LcbnXb1Hk4q3jNCar5ak',
        '1234',
    );
    const feedClient = useNotifications(
      knockClient,
      '0707c4df-da44-4436-849a-6587ddec1b1e',
    );
  
    const useNotificationStore = create(feedClient.store);
    const { items, metadata } = useNotificationStore();
    // console.log({items});
    useEffect(() => { 
        // console.log("fetching...");
        feedClient.fetch()
    }, [feedClient]);
  
    
  return (
    <div className="notifications">
      <span>You have {metadata.unread_count} unread items</span>

      {items.map((item) => (
        <div key={item.id}>
          <div dangerouslySetInnerHTML={{ __html: item.blocks[0].rendered }} />
        </div>
      ))}
    </div>
  );
  };