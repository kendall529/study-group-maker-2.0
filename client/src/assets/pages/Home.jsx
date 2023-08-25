const Home = () => {
  
    return (
      <main>
        <div>
          <div>
            <section id="home">
                <div class="mission-statement-container">
                    <div class="mission-wrapper">
                        <h1 class="mission-statement">We want to make it easier for people to
                        study together.</h1>

                        <p>Unlock your potential with our Study Group
                        Maker and join a community of motivated learners.
                        </p>
                        <button><a href="/groups">Checkout Some Study Groups</a></button>
                    </div>

                </div> 
            </section>

            <section class="about" id="about">
                <div>
                    <h2 class="heading">About</h2>
                </div>
                <div id="about-card-container" class="about-card-container">
                    <div class="about-card">
                        <h3>Past</h3>
                        <p>It all started with a dream to better understand material from the boot camp.
                        </p>
                    </div>

                    <div class="about-card">
                        <h3>Present</h3>
                        <p>Fast forward to today, now we can proudly show an application capable of
                        organizing study
                        groups and taking our developer knowledge to the next level.</p>
                        <i><box-icon name='play'></box-icon></i>
                    </div>

                    <div class="about-card">
                        <h3>Future</h3>
                        <p>We hope to host our own chat-rooms and video calls that can then be
                        further customized as
                        learning spaces that help improve a student's learning experience by greater leaps.</p>
                    </div>
                </div>
            </section>

            <section id="creators">
                <div class="creators-container">
                    <h2 class="heading">Our <span>Developers</span></h2>

                    <div class="creators-wrapper">
                        <div class="creators-box swiper mySwiper">
                            <div class="creators-content swiper-wrapper">
                                <div class="creators-slide swiper-slide">
                                    <img src="../images/kendall.png" alt=""/>
                                    <h3>Kendall Smith</h3>
                                    <p>Kendall enjoys being outdoors in his free time doing anything from shooting hoops to kayaking to rock climbing. His education started in health 
                                     sciences but he's now moved into computer sciences. When it comes to work, he prefers to sit at a computer and engineer applications. For breaks, 
                                     he occasionally practices typing to improve his speed and accuracy. In the past year he has gone from not being able to touch type to 70 wpm and keeps 
                                     getting faster.
                                    </p>
                                </div>
                                <div class="creators-slide swiper-slide">
                                    <img src="../images/tommy.jpg" alt=""/>
                                    <h3>Nam Nguyen</h3>
                                    <p>Nam Nguyen graduated from University of Kansas with a Bachelor's degree in Computer Science. He is currently unemployed and joined KU's 
                                    coding bootcamp in hopes of learning more on topics that weren't as touched upon in college. He initially enrolled in Electrical Engineering courses, 
                                    but wasn't enjoying the work. A programming course was required for the major, and he understood what was going on and loved seeing things that he 
                                    built working. He immediately switched over majors.
                                    </p>
                                </div>
                                <div class="creators-slide swiper-slide">
                                    <img src="../images/jenny.jpg" alt=""/>
                                    <h3>Jennifer Dutton</h3>
                                    <p>Jennifer is a busy mom of seven who loves to code in her spare time. Exploring the world of programming allows her to exercise her creativity 
                                        and problem-solving skills, bringing her ideas to life!
                                    </p>
                                </div>
                                <div class="creators-slide swiper-slide">
                                    <img src="" alt=""/>
                                        <h3>Michaela Brown</h3>
                                        <p>Michaela is currently working as a tax agent but looking to start work in programming. A graduate from Washburn University with a minor in
                                            computer science, she found a love for coding and has decided to pursue it further. She finds nothing to be more satisfying than to see a 
                                            project come to fruition. 
                                        </p>
                                </div>
                            </div>

                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </section>

          </div>
        </div>
      </main>
    );
  };
  
export default Home;