import { apiSlice } from "./apiSlice"; 

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        const mockUsers = [
          {
            email: "admin@authormanagement.com",
            password: "Admin123!",
            role: "admin",
          },
          {
            email: "teacher@coursesmanagement.com",
            password: "Teacher123!",
            role: "teacher",
          },
        ];

        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          return { data: user }; 
        } else {
          return { error: { status: 401, message: "Invalid credentials" } }; 
        }
      },
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;
