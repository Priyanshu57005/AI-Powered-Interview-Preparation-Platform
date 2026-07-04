const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod/v3")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

//to-check
// async function invokeGeminiAi(){
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: "Hello gemini ! explain is inteview??"
//     })
//     console.log(response.text)
// }
//module.exports = invokeGeminiAi





const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
})



async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });

    // Call text() to get the JSON string
    const responseText = response.text;

    console.log("Gemini Response:");
    console.log(responseText);

    const json = JSON.parse(responseText);

    return json;
}


async function generatePdfFormHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
            top: "0mm",
            bottom: "0mm",
            left: "0mm",
            right: "0mm"
        }
    })
    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    // Major change: generate a single-page, ATS-safe resume instead of interview-report content.
    const prompt = `You are an expert ATS resume writer and senior software engineering resume editor.

Create a professional, ATS-friendly, exactly one-page resume as clean HTML with inline CSS for Puppeteer PDF generation.

Candidate Source Resume:
${resume || "Not provided"}

Candidate Self Description:
${selfDescription || "Not provided"}

Target Job Description:
${jobDescription || "Not provided"}

Output Contract:
- Return valid JSON only.
- JSON shape must be: { "html": "<!doctype html>..." }
- The html string must contain a complete HTML document.

Strict ATS Resume Requirements:
- Exactly one A4 page.
- White background.
- Black text only.
- No tables.
- No graphics.
- No icons.
- No images.
- No emojis.
- No progress bars.
- No columns that rely on tables.
- No decorative colors.
- No external fonts, scripts, stylesheets, or assets.
- Use semantic HTML sections and inline CSS only.
- Keep CSS simple and print-safe.
- Use professional typography with Arial, Helvetica, or sans-serif.
- Use compact spacing so the PDF fits one page.
- Do not invent degrees, companies, dates, certifications, links, metrics, or contact details that are not present in the candidate data.
- If a section has no reliable information, include the section heading with one concise line: "Not provided".
- Tailor wording toward the target job description while staying truthful to the candidate data.

Required Resume Sections in this exact order:
1. Name
2. Role
3. Contact
4. Summary
5. Skills
6. Projects
7. Education
8. Certifications
9. Achievements

Content Rules:
- Name should be the candidate's real name if found; otherwise use "Candidate Name".
- Role should be the strongest target role inferred from the resume and job description.
- Contact should include available email, phone, location, LinkedIn, GitHub, portfolio, or "Not provided".
- Summary should be 2-3 concise lines focused on role fit.
- Skills should be grouped in short ATS-readable text lines, not visual chips.
- Projects should include 2-3 strongest projects with project name, technologies, and impact bullets.
- Education should be concise and factual.
- Certifications should be concise and factual.
- Achievements should be measurable when evidence exists, otherwise concise professional accomplishments from the provided content.

HTML/CSS Requirements:
- Include this page setup or equivalent inline CSS:
  @page { size: A4; margin: 0; }
  html, body { margin: 0; padding: 0; background: #ffffff; color: #111111; }
- Create a single .resume-page container sized width: 210mm; min-height: 297mm; max-height: 297mm; padding: 12mm 14mm; box-sizing: border-box; overflow: hidden.
- Use font-size between 9px and 13px for body content.
- Use h1 for name, h2 for section headings.
- Section headings must be uppercase, simple, and separated by a thin black border-bottom.
- Use bullet lists with plain text bullets only.
- Keep bullets short, action-oriented, and ATS-readable.
- Avoid long paragraphs.
- Do not include markdown fences.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    });
    console.log(response.text);
    const json = JSON.parse(response.text);

    if (!json.html) {
        throw new Error("AI did not return HTML content for the resume.");
    }

    const pdfBuffer = await generatePdfFormHtml(json.html);
    return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf }
