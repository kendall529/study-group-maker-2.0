const Contact = () => {
  
    return (
        <div>
          <div>
            <h2 className="heading">Contact <span>Us</span></h2>

            <form id = "contact-form">
                <div className="input-box">
                    <input id="name" type="text" placeholder="Full Name"/>
                    <input id="email" type="email" placeholder="Email Address"/>
                </div>
                <div className="input-box">
                    <input id="phone" type="number" placeholder="Mobile Number"/>
                    <input id="subject" type="text" placeholder="Email Subject"/>
                </div>
                <textarea id="message" name="" cols="30" rows="10" placeholder="Your Message"></textarea>
                <input type="submit" value="Send Message" className="button"/>
            </form>
          </div>
        </div>
    );
  };
  
export default Contact;