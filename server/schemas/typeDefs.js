const typeDefs = `
  type User {
    _id: ID!
    user_name: String!
    first_name: String!
    last_name: String!
    email: String!
    groups: [Group]
  }

  type Group {
    _id: ID!
    group_name: String!
    group_description: String!
    topic_id: Topic!
    skill_level: String!
    zoom_link: String!
    meet_time: String!
    created_by: User!
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
    getGroup(group_id: ID!): Group
    getTopics: [Topic]
  }

  type Mutation {
    login(user_name: String!, password: String!): Auth
    addUser(user_name: String!, email: String!, password: String!): Auth
    addGroup(group_name: String!, group_description: String!, topic_id: ID!, skill_level: String!, zoom_link: String!, meet_time: String!, created_by: ID!): Group
    removeGroup(group_id: ID!): Group
    enroll(user_id: ID!, group_id: ID!): User
    unEnroll(user_id: ID!, group_id: ID!): User
  }
`;

module.exports = typeDefs;
