const Contact = () => {
  
    return (
      <main>
        <div>
          <div>
            <h2 class="heading">Contact <span>Us</span></h2>

            <form id = "contact-form">
                <div class="input-box">
                    <input id="name" type="text" placeholder="Full Name"/>
                    <input id="email" type="email" placeholder="Email Address"/>
                </div>
                <div class="input-box">
                    <input id="phone" type="number" placeholder="Mobile Number"/>
                    <input id="subject" type="text" placeholder="Email Subject"/>
                </div>
                <textarea id="message" name="" cols="30" rows="10" placeholder="Your Message"></textarea>
                <input type="submit" value="Send Message" class="button"/>
            </form>
          </div>
        </div>
      </main>
    );
  };
  
export default Contact;