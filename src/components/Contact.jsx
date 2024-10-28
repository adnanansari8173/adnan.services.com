import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState(""); // You can now use this state to display messages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/service-backend/saveData.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        toast.success("Form submitted successfully");
        setMessage("Form submitted successfully!"); // Set success message
      } else {
        setMessage("Failed to submit form."); // Set failure message
        toast.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred."); // Set error message
    }
  };

  return (
    <div id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold">Get in Touch</h2>
        <p className="text-lg mt-4 text-gray-600">
          Feel free to contact us for any inquiries
        </p>

        {/* Contact Form Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center">
          <form
            className="w-full md:w-1/2 max-w-xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit} // Attach submit handler
          >
            <motion.input
              type="text"
              name="name"
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg transition duration-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Your Name"
              whileHover={{ scale: 1.05 }}
              value={formData.name}
              onChange={handleChange}
            />
            <motion.input
              type="email"
              name="email"
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg transition duration-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Your Email"
              whileHover={{ scale: 1.05 }}
              value={formData.email}
              onChange={handleChange}
            />
            <motion.textarea
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg transition duration-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Your Message"
              name="message"
              rows="4"
              whileHover={{ scale: 1.05 }}
              value={formData.message}
              onChange={handleChange}
            ></motion.textarea>
            <motion.button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Send Message
            </motion.button>
          </form>

          {/* Display the message */}
          {message && (
            <motion.p
              className="text-center text-red-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {message}
            </motion.p>
          )}

          {/* Location Map Section */}
          <div className="mt-8 md:mt-0 md:ml-8 w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Our Location</h3>
            <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.67292815258!2d72.71637298606544!3d19.082502004737197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1729100132947!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;