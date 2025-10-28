import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { questionAPI } from "../api";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    questionAPI
      .getAll({ limit: 10 })
      .then((res) => setQuestions(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Navigation */}
      <nav className="bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2.5 h-5 bg-black rounded-sm"></div>
                <div className="w-2.5 h-5 bg-yellow-400 rounded-sm"></div>
                <div className="w-2.5 h-5 bg-red-600 rounded-sm"></div>
              </div>
              <span className="font-bold text-xl text-text-light-primary dark:text-text-dark-primary">
                Edulink
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
            Community Feed
          </h1>
          <Link
            to="/ask-question"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90"
          >
            Ask Question
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-2 text-text-light-secondary dark:text-text-dark-secondary">
              Loading questions...
            </p>
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 bg-card-light dark:bg-card-dark rounded-xl">
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              No questions yet. Be the first to ask!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <Link
                key={question._id}
                to={`/questions/${question._id}`}
                className="block bg-card-light dark:bg-card-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                        {question.subject}
                      </span>
                      <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                        {question.educationLevel}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-text-light-primary dark:text-text-dark-primary mb-2">
                      {question.title}
                    </h3>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary line-clamp-2">
                      {question.body}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      <span>👤 {question.author?.name || "Anonymous"}</span>
                      <span>💬 {question.answers?.length || 0} answers</span>
                      <span>👁️ {question.views || 0} views</span>
                      <span>👍 {question.upvotes?.length || 0} upvotes</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
