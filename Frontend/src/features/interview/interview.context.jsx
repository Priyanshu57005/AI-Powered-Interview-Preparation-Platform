import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    // Loading states
    const [loadingInterview, setLoadingInterview] = useState(false);
    const [loadingResume, setLoadingResume] = useState(false);

    // Shared loading (used if you still need a generic loading flag)
    const loading = loadingInterview || loadingResume;

    // Interview report state
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);

    return (
        <InterviewContext.Provider
            value={{
                // Combined loading
                loading,

                // Individual loading states
                loadingInterview,
                setLoadingInterview,

                loadingResume,
                setLoadingResume,

                // Report state
                report,
                setReport,

                reports,
                setReports,
            }}
        >
            {children}
        </InterviewContext.Provider>
    );
};