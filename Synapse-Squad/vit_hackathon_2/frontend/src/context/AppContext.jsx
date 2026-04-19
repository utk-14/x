import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { testApi } from "../api/testApi";
import { reportApi } from "../api/reportApi";
import { useAuth } from "../hooks/useAuth";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user } = useAuth();

  const [currentModule, setCurrentModule] = useState("alphabet");
  const [mistakes, setMistakes] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fontScale, setFontScale] = useState(() => {
    if (typeof window === "undefined") return 100;
    return Number(localStorage.getItem("brb-font-scale") || 100);
  });

  // 🔥 Apply font scaling
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.fontSize = `${fontScale}%`;
    localStorage.setItem("brb-font-scale", fontScale);
  }, [fontScale]);

  const increaseFont = () => setFontScale((prev) => Math.min(prev + 10, 140));
  const decreaseFont = () => setFontScale((prev) => Math.max(prev - 10, 80));

  // 🔥 Fetch mistakes (FINAL TEST QUESTIONS)
  const fetchMistakes = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await testApi.getFinalTest();
      setMistakes(data.questions || []);
    } catch (error) {
      console.error("Failed to fetch mistakes:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Fetch report
  const fetchReport = async () => {
    if (!user) return null;

    try {
      const report = await reportApi.getReport();
      setTestResults(report);
      return report;
    } catch (error) {
      console.error("Failed to fetch report:", error);
      return null;
    }
  };

  // 🔥 Submit final test
  const submitTest = async (answers) => {
    if (!user) return null;

    setLoading(true);
    try {
      const result = await testApi.submitFinalTest(answers);
      setTestResults(result);
      return result;
    } catch (error) {
      console.error("Failed to submit test:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Change module
  const setModule = (moduleId) => setCurrentModule(moduleId);

  const addMistake = (mistake) => {
    setMistakes((prev) => [...(Array.isArray(prev) ? prev : []), mistake]);
  };

  // 🔥 Load mistakes when user logs in
  useEffect(() => {
    if (user) {
      fetchMistakes();
    }
  }, [user]);

  const value = useMemo(
    () => ({
      currentModule,
      setModule,
      mistakes,
      testResults,
      loading,
      fetchMistakes,
      fetchReport,
      submitTest,
      addMistake,
      fontScale,
      increaseFont,
      decreaseFont,
    }),
    [currentModule, mistakes, testResults, loading]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);