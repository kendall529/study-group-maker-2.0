const typeDefs = `
  type User {
    _id: ID!
    user_name: String!
    first_name: String!
    last_name: String!
    email: String!
  }

  type Group {
    _id: ID!
    group_name: String!
    group_description: String!
    topic: Topic!
    skill_level: String!
    zoom_link: String!
    meet_time: String!
    created_by: User
  }

  type Topic {
    _id: ID!
    topic_name: String!
  }

  type Enrollments {
    enrollmentId: ID!
    user: User!
    group: Group!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUsers: [User]
    getUser: User
    getGroups: [Group]
    getGroup: Group
    getTopics: [Topic]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGroup(group_name: String!, group_description: String!, topic: Topic!, skill_level: String!, zoom_link: String!, meet_time: String!, created_by: User!)
    removeGroup(group_id: ID!)
    enroll(user: User!, group: Group!)
    unEnroll(user_id: ID!, group_id: ID!)
  }
`;

module.exports = typeDefs;
