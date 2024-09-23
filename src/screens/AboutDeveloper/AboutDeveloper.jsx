import profilePhoto from "../../assets/passport_photo.png";

const AboutDeveloper = () => {
  return (
    <div className=" bg-white text-red-700 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-red-50 rounded-lg shadow-lg p-6 md:flex md:items-center">
        {/* Profile Section */}
        <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
          <img
            src={profilePhoto}
            alt="Developer Profile"
            className="rounded-full w-40 h-60 md:w-48 md:h-48 shadow-lg border-4 border-red-500"
          />
        </div>

        {/* Biography Section */}
        <div className="md:w-2/3 ml-0 md:ml-6 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">Sanan Baig</h1>
          <p className="text-xl mb-4">
            Hi! I&apos;m Sanan, a passionate software developer with a knack for
            building dynamic, user-centric web applications. I love working with
            React, .NET, and creating seamless user experiences.
          </p>

          {/* Projects Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Recent Projects</h2>
            <ul className="list-disc pl-5 text-lg">
              <li className="mb-2">
                <strong>Expense Manager</strong>: A comprehensive platform for
                managing and visualizing company expenses.
              </li>
              <li className="mb-2">
                <strong>Portfolio Website</strong>: A clean, professional
                website to showcase personal projects and blog posts.
              </li>
              <li className="mb-2">
                <strong>E-Commerce App</strong>: A robust, scalable online
                shopping platform with integrated payment solutions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
