import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OfflineToggle = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineMode, setOfflineMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleOfflineMode = () => {
    setOfflineMode(!offlineMode);
    toast({
      title: offlineMode ? "Online Mode Enabled" : "Offline Mode Enabled",
      description: offlineMode 
        ? "You can now access online features and sync data" 
        : "Content will be downloaded for offline access",
    });
  };

  const currentMode = !isOnline || offlineMode;

  return (
    <Button
      variant={currentMode ? "destructive" : "default"}
      size="sm"
      onClick={toggleOfflineMode}
      className="flex items-center gap-2"
    >
      {currentMode ? (
        <>
          <WifiOff className="w-4 h-4" />
          <span className="hidden sm:inline">Offline</span>
        </>
      ) : (
        <>
          <Wifi className="w-4 h-4" />
          <span className="hidden sm:inline">Online</span>
        </>
      )}
    </Button>
  );
};