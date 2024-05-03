import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import AdminRoles from "../pages/Admin/AdminRoles";
import { vi } from "vitest";
import { User } from "../types/dbTypes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { TextSizeProvider } from "../TextSizeContext";

vi.mock("../pages/Login", () => ({
    getUserAuth: vi.fn().mockResolvedValue({
        _id: 123,
        email: "weiwu@tamu.edu",
        name: "Warren Wu",
        given_name: "Warren",
        family_name: "Wu",
        picture: "https://lh3.googleusercontent.com/a/ACg8ocL9v0n1KM6ZOtKSYKkwg7IdtlwYGUmKlK4uJnx5WYunJuKQ06ao=s96-c",
    })
}))

const customRender = (ui:any, options?:any) => {
    return render(
        <GoogleOAuthProvider clientId="12221267435-lsk9h3j605atjq4n35dvpsf2gun7dh6a.apps.googleusercontent.com">
            <BrowserRouter>
                <TextSizeProvider>
                {ui}
                </TextSizeProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>,
        options
    )
}

const testProfile: User = {
    _id: 123,
    email: "weiwu@tamu.edu",
    name: "Warren Wu",
    given_name: "Warren",
    family_name: "Wu",
    picture: "https://lh3.googleusercontent.com/a/ACg8ocL9v0n1KM6ZOtKSYKkwg7IdtlwYGUmKlK4uJnx5WYunJuKQ06ao=s96-c",
}

const testData = [
    {
        _id: 3,
        email: "suryajasper@tamu.edu",
        type: "manager"
      },
      {
        _id: 2,
        email: "jake2007smith@gmail.com",
        type: "cashier"
      },
      {
        _id: 1,
        email: "suryajasper2004@gmail.com",
        type: "admin"
      },
]


const mockFetch = vi.fn();
global.fetch = vi.fn();

describe("All Admin Page Tests", () => {
    it("should render admin page without crashing", () => {
        render(<Admin/>, { wrapper: BrowserRouter });
    })
    it("should render admin roles page without crashing", () => {
        render(<AdminRoles />, { wrapper: BrowserRouter});
    })

    it("fetch user profile and roles", async () => {
        mockFetch.mockResolvedValueOnce({
            json: async () => testData
        })
        customRender(<AdminRoles/>);
        await waitFor(() => {
            expect(screen.getByText("Admins")).toBeTruthy();
            // test update roles by testing on change for input
            // const inputField:any = screen.getByPlaceholderText("hello@gmail.com");
            // fireEvent.change(inputField, { target: { value: "newemail@gmail.com"}})
    
            // expect(inputField.value).toBe("newemail@gmail.com");
        })

        vi.clearAllMocks();
    })
})