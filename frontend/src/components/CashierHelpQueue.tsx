import { useEffect, useState } from "react";

/**
 * Component representing the Cashier Help Queue.
 */
export default function CashierHelpQueue() {
    const [stations, setStations] = useState<boolean[]>([]);
    const [active, setActive] = useState<number>(-1);

    /**
     * Fetches the help stations from the backend API.
     */
    const fetchHelpStations = async () => {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/helpStations');
        setStations(await response.json());
    }

    /**
     * Resolves the help request for a specific station.
     * @param stationIdx - The index of the station to resolve the help request for.
     * @throws Error if the help request could not be resolved.
     */
    const resolveHelp = async (stationIdx: number) => {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/resolveHelp?station=' + stationIdx, { method: 'POST', });
        const status = await response.json();

        if (status.success)
            fetchHelpStations();
        throw Error("Could not resolve help");
    }

    useEffect(() => {
        fetchHelpStations();
    }, [])
    
    return (
        <div className="p-0 flex gap-4">
            {stations.map((stationHelpStatus, stationIdx) => ( stationHelpStatus &&
                <div 
                    className="px-4 py-2 flex gap-2 justify-center items-center rounded-md cursor-pointer font-ptserif border-2"
                    style={{ borderColor: (active === stationIdx) ? 'green' : 'red' }}
                    onMouseEnter={() => setActive(stationIdx)}
                    onMouseLeave={() => setActive(-1)}
                    onClick={() => resolveHelp(stationIdx)}
                >
                    {active === stationIdx ? (
                        <><b>Resolve</b> Station {stationIdx+1}.</>
                    ) : (
                        <><b>Help:</b> Station {stationIdx+1}.</>
                    )}
                </div>
            ))}
        </div>
    );
}