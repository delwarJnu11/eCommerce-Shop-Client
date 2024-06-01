import { FaFacebook, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container mx-auto">
      <h2 className="uppercase text-3xl text-center underline font-bold tracking-widest mt-8 text-[#474545]">
        Contact us
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-start  py-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">
            Do you have any questions?
          </h2>
          <p className="mb-4">We are at your disposal 7 days a week!</p>
          <div className="not-italic my-4">
            Tajmohol Road,
            <br /> Mohammadpur, Dhaka-1207,
            <br /> Bangladesh
          </div>
          <a
            href="mailto:shopee@gmail.com"
            className="text-blue-500 hover:underline mb-4 block"
          >
            shopee@gmail.com
          </a>
          <p className="mb-4 font-bold">+880 174949 7676</p>
          <div className="flex space-x-4">
            <div className="text-gray-500 cursor-pointer hover:text-[#FF6500]">
              <FaFacebook size={20} />
            </div>
            <div className="text-gray-500 cursor-pointer hover:text-[#FF6500]">
              <FaLinkedinIn size={20} />
            </div>
            <div className="text-gray-500 cursor-pointer hover:text-[#FF6500]">
              <FaTwitter size={20} />
            </div>
            <div className="text-gray-500 cursor-pointer hover:text-[#FF6500]">
              <FaYoutube size={20} />
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <form action="#" method="POST" className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail *"
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject *"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              className="w-full p-2 border rounded"
            ></textarea>
            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded hover:bg-gray-800"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
