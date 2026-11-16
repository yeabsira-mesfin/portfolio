import { getReply } from "./PortfolioAssistant";

describe("portfolio assistant topic routing", () => {
  test("answers AI questions with grounded work", () => {
    expect(getReply("How does Yeabsira work with AI?")).toContain("AgentBench Pro");
    expect(getReply("What LLM security tools has he built?")).toContain("AI Security Testing Lab");
  });
  test("answers defensive engineering questions with practical projects", () => {
    expect(getReply("What defensive projects has he built?")).toContain("AppSec Vulnerability Manager");
    expect(getReply("Does he know JWT and RBAC security?")).toContain("Secure Login Analyzer");
  });
  test("does not mistake know for now", () => {
    expect(getReply("What does he know about secure API design?")).toContain("AppSec Vulnerability Manager");
  });
  test("shows projects when asked broadly", () => {
    expect(getReply("Show me his recent projects")).toContain("AgentBench Pro");
  });
  test("keeps enterprise experience grounded", () => {
    const answer = getReply("What is his background at MMCY?");
    expect(answer).toContain("BCD Travel");
    expect(answer).toContain("Cvent development");
  });
  test("describes GWU studies and career goals", () => {
    expect(getReply("What is he studying at GWU?")).toContain("The George Washington University");
    expect(getReply("What roles is he targeting?")).toContain("Security Analyst");
  });
  test("answers general skills questions", () => {
    expect(getReply("What does he specialize in?")).toContain("full-stack software engineering");
  });
  test("handles empty and unmatched questions", () => {
    expect(getReply("")).toContain("defensive engineering work");
    expect(getReply("Favorite breakfast?")).toContain("defensive projects");
  });
});
