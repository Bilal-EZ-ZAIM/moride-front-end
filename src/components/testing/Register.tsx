import React, { useState } from "react";

const RegisterT = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userData, setUserData] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const validate = () => {
    let validationErrors: { [key: string]: string } = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword || password === "") {
      validationErrors.confirmPassword = "Passwords must match";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setUserData({ email, password });
      console.log("Form submitted successfully");
    }
  };

  const getUserData = () => {
    return userData;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        data-cy="form-register"
      >
        <h2 className="text-2xl font-bold mb-4" data-cy="register">
          Register
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-cy="input-email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1" data-cy="error-email">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-cy="input-password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1" data-cy="error-password">
              {errors.password}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            data-cy="input-confirm-password"
          />
          {errors.confirmPassword && (
            <p
              className="text-red-500 text-sm mt-1"
              data-cy="error-confirm-password"
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
          data-cy="submit-button"
        >
          Register
        </button>
      </form>

      {userData && (
        <div className="mt-4" data-cy="user-data">
          <h3 className="font-semibold">User Data:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RegisterT;
