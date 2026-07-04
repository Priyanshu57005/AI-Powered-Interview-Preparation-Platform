import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportById,
    generateResumePdf
} from "../services/interview.api";

import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {

    const context = useContext(InterviewContext);
    const { interviewId } = useParams();

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const {
        loading,
        loadingInterview,
        setLoadingInterview,
        loadingResume,
        setLoadingResume,
        report,
        setReport,
        reports,
        setReports
    } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoadingInterview(true);

        let response = null;

        try {
            response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile
            });

            setReport(response.interviewReport);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingInterview(false);
        }

        if (!response) return null;

        return response.interviewReport;
    };

    const getReportById = async (interviewId) => {

        setLoadingInterview(true);

        let response = null;

        try {
            response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingInterview(false);
        }

        if (!response) return null;

        return response.interviewReport;
    };

    const getReports = async () => {

        setLoadingInterview(true);

        let response = null;

        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingInterview(false);
        }

        if (!response) return [];

        return response.interviewReports;
    };

    const getResumePdf = async (interviewReportId) => {

        setLoadingResume(true);

        let response = null;

        try {
            response = await generateResumePdf({
                interviewReportId
            });

            const url = window.URL.createObjectURL(
                new Blob([response], {
                    type: "application/pdf"
                })
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `resume_${interviewReportId}.pdf`
            );

            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (error) {
            console.log(error);
            alert("Failed to generate resume PDF. Please try again.");
        } finally {
            setLoadingResume(false);
        }
    };

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        } else {
            getReports();
        }
    }, [interviewId]);

    return {
        loading,
        loadingInterview,
        loadingResume,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    };
};