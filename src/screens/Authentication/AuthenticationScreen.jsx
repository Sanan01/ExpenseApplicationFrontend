import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthenticationContainer } from "./AuthenticationContainer";

function AuthenticationScreen() {
  const {
    isLogin,
    showPassword,
    formData,
    errors,
    handleChange,
    handleSubmit,
    toggleAuthMode,
    setShowPassword,
  } = useAuthenticationContainer();

  return (
    <div
      className="flex-1 flex items-center justify-center 
      bg-center"
      style={{
        backgroundImage:
          'url("https://www.veripark.com/sites/default/files/styles/image_style_1_3_landscape_xl/public/media/images/2024-09/About-us_Banner_2024.jpg?h=61ca0bd2&itok=-aOd6aUk")',
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm pl-10"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm pl-10 pr-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FaEye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-spacing-1 text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isLogin ? "Sign in" : "Register"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={toggleAuthMode}
            className="font-medium text-red-600 hover:text-red-500"
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationScreen;
