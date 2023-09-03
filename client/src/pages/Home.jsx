import tommyImg from "../assets/images/tommy.jpg";
import kendallImg from "../assets/images/kendall.png";
import jennyImg from "../assets/images/jenny.jpg";
import michaelaImg from "../assets/images/michaela.jpg";

const Home = () => {
  
    return (
        <div>
          <div>
            <section className='bg-image bg-cover bg-center h-64' style={{ backgroundImage: "url('src/assets/images/books.jpg')" }} id="home">
                <div className="mission-statement-container container mx-auto flex justify-center">
                    <div className="mission-wrapper mt-10 text-center">
                        <h1 className="mission-statement text-4xl font-bold text-white mt-2">We want to make it easier for people to
                        study together.</h1>

                        <p className='text-xl font-semibold text-white italic'>Unlock your potential with our Study Group
                        Maker and join a community of motivated learners.
                        </p>
                        <button className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded place-self-center'><a href="/groups">Checkout Some Study Groups</a></button>
                    </div>

                </div> 
            </section>

            <section className="about" id="about">
                <div>
                    <h2 className="text-gray-400 text-5xl font-semibold flex justify-center">About</h2>
                </div>
                <div id="about-card-container" className="about-card-container">
                    <div className="about-card text-gray-400">
                        <h3>Past</h3>
                        <p>It all started with a dream to better understand material from the boot camp.
                        </p>
                    </div>

                    <div className="about-card text-gray-400">
                        <h3>Present</h3>
                        <p>Fast forward to today, now we can proudly show an application capable of
                        organizing study
                        groups and taking our developer knowledge to the next level.</p>
                        <i><box-icon name='play'></box-icon></i>
                    </div>

                    <div className="about-card text-gray-400">
                        <h3>Future</h3>
                        <p>We hope to host our own chat-rooms and video calls that can then be
                        further customized as
                        learning spaces that help improve a student's learning experience by greater leaps.</p>
                    </div>
                </div>
            </section>

            <section id="creators">
                <h2 className="mb-20 text-gray-400 text-4xl font-semibold flex justify-center">Meet Our Developers</h2>
                    
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                            
                                <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                                    <img src={kendallImg} alt="" className='w-auto h-auto rounded-lg mb-4'/>
                                    <h3 className='text-xl font-semibold'>Kendall Smith</h3>
                                    <p>Kendall enjoys being outdoors in his free time doing anything from shooting hoops to kayaking to rock climbing. His education started in health 
                                     sciences but he's now moved into computer sciences. When it comes to work, he prefers to sit at a computer and engineer applications. For breaks, 
                                     he occasionally practices typing to improve his speed and accuracy. In the past year he has gone from not being able to touch type to 70 wpm and keeps 
                                     getting faster.
                                    </p>
                                </div>
                                <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                                    <img src= {tommyImg} alt="" className='w-auto h-auto rounded-lg mb-4'/>
                                    <h3 className='text-xl font-semibold'>Nam Nguyen</h3>
                                    <p>Nam Nguyen graduated from University of Kansas with a Bachelor's degree in Computer Science. He is currently unemployed and joined KU's 
                                    coding bootcamp in hopes of learning more on topics that weren't as touched upon in college. He initially enrolled in Electrical Engineering courses, 
                                    but wasn't enjoying the work. A programming course was required for the major, and he understood what was going on and loved seeing things that he 
                                    built working. He immediately switched over majors.
                                    </p>
                                </div>
                                <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                                    <img src={jennyImg} alt="" className='w-auto h-auto rounded-lg mb-4'/>
                                    <h3 className='text-xl font-semibold'>Jennifer Dutton</h3>
                                    <p>Jennifer is a busy mom of seven who loves to code in her spare time. Exploring the world of programming allows her to exercise her creativity 
                                        and problem-solving skills, bringing her ideas to life!
                                    </p>
                                </div>
                                <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                                    <img src={michaelaImg} alt="" className='w-auto h-auto rounded-lg mb-4'/>
                                        <h3 className='text-xl font-semibold'>Michaela Brown</h3>
                                        <p>Michaela is currently working as a tax agent but looking to start work in programming. A graduate from Washburn University with a minor in
                                            computer science, she found a love for coding and has decided to pursue it further. She finds nothing to be more satisfying than to see a 
                                            project come to fruition. 
                                        </p>
                                </div>
                        </div>
                        
     </section> 

          </div>
        </div>
    );
  };

export default Home;