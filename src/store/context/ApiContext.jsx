import React, { createContext, useContext, useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

// Create Context
const ApiContext = createContext();

// Provider
export function ApiProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example: GET request
  const get = useCallback(async (url, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Example: POST request
  const post = useCallback(async (url, data, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add put, delete, patch as needed...

  return (
    <ApiContext.Provider value={{ get, post, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
}

// Custom hook for easy access
export function useApi() {
  return useContext(ApiContext);
}
