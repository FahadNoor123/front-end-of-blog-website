import { useEffect } from "react";

const useTimeTracker = (postId, userId) => {
    useEffect(() => {
        let startTime = Date.now();

        const sendTimeData = async () => {
            const timeSpent = Date.now() - startTime;
            await fetch("https://your-backend.com/api/store-time", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, userId, timeSpent }),
            });
        };

        window.addEventListener("beforeunload", sendTimeData);
        return () => {
            sendTimeData(); // Also send when the component unmounts
            window.removeEventListener("beforeunload", sendTimeData);
        };
    }, [postId, userId]);
};

export default useTimeTracker;
