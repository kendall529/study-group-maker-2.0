const GroupForm = ({groups, users2, enrollments, title}) => {

    return (
        <div>
            <div>
            <h2 class="is-size-2 ml-3">Ready to study, {enrollments.first_name}?!</h2>
          </div>


          <section id="profile">
            <h3 class="is-size-3 ml-3 pb-2">Make a Study Group!</h3>
            <div class="topOfProfile">
                <div class="profile-container">
                    <div class="formWrapper">
                        <form class="form" id="create_group" action="">
                        <div>
                            <label class="label" for="group_name">Group Name: </label>
                            <input class="input" type="text" name="group_name" id="group_name"/>
                        </div>
                        <div>
                            <label class="label" for="group_description">Group Description: </label>
                            <input class="input" type="text" name="group_description" id="group_description"/>
                        </div>
                        <div>
                            <label class="label" for="topic_id">Topic: </label>
                            {topics &&
                            topics.map((topic) => (
                                <select class="select" name="topic_id" id="topic_id">
                                <option value={topic.id}>{topic.name}</option>
                            </select>
                            ))}
                        </div>
                        <div>
                            <label class="label" for="skill_level">Skill Level: </label>
                            <select class="select" name="skill_level" id="skill_level">
                                <option value="Beginner">Beginner</option>
                            <   option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label class="label" for="zoom_link">Zoom Link: </label>
                            <input class="input" type="text" name="zoom_link" id="zoom_link"/>
                        </div>
                        <div>
                            <label class="label" for="meet_half_hour">Meet Time: </label>
                            <select class="select" name="meet_half_hour" id="meet_half_hour">
                                <option value="1:00">1:00</option>
                                <option value="1:30">1:30</option>
                                <option value="2:00">2:00</option>
                                <option value="2:30">2:30</option>
                                <option value="3:00">3:00</option>
                                <option value="3:30">3:30</option>
                                <option value="4:00">4:00</option>
                                <option value="4:30">4:30</option>
                                <option value="5:00">5:00</option>
                                <option value="5:30">5:30</option>
                                <option value="6:00">6:00</option>
                                <option value="6:30">6:30</option>
                                <option value="7:00">7:00</option>
                                <option value="7:30">7:30</option>
                                <option value="8:00">8:00</option>
                                <option value="8:30">8:30</option>
                                <option value="9:00">9:00</option>
                                <option value="9:30">9:30</option>
                                <option value="10:00">10:00</option>
                                <option value="10:30">10:30</option>
                                <option value="11:00">11:00</option>
                                <option value="11:30">11:30</option>
                                <option value="12:00">12:00</option>
                                <option value="12:30">12:30</option>
                            </select>
                            <select class="select" name="meet_am_pm" id="meet_am_pm">
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                            <select class="select" name="meet_timezone" id="meet_timezone">
                                <option value="CST">CST</option>
                                <option value="MST">MST</option>
                                <option value="PST">CST</option>
                                <option value="EST">EST</option>

                            </select>
                        </div>
                        <button class="button has-background-info-dark has-text-white mt-3" type="submit">Submit</button>
                        <div id="group-fail" class="has-text-danger"></div>
                        </form>
                    </div>

                    <div class="profileImg">
                        <img class="image" src="./assets/group-of-students.jpg"
                        alt="A group of students at a table studying together."/>
                    </div>
                </div>

            </div>
    </section>
    </div>
  );
};

export default GroupForm;
