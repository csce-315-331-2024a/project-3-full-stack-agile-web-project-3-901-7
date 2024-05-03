import { render } from "@testing-library/react";
import { Login } from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider, TokenResponse } from "@react-oauth/google";
import { TextSizeProvider } from "../TextSizeContext";
import { authLevel, getUserAuth } from "../pages/Login";
import CookieManager from "../utils/CookieManager";
import { User, UserType } from "../types/dbTypes";
import { vi } from "vitest";

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

const testGoogleResponse: TokenResponse = {
    access_token: "abcdefghijklmnop",
    expires_in: 3600,
    prompt: "consent",
    token_type: "Bearer",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
}

interface CredCache {
    googleResponse?: TokenResponse;
    userInfo?: User;
    type: UserType;
}

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Login Page Tests", () => {
    it("testing authLevel function", () => {
        expect(authLevel("customer")).toBe(1);
        expect(authLevel("cashier")).toBe(2);
        expect(authLevel("manager")).toBe(3);
        expect(authLevel("admin")).toBe(4);
    })
    it("testing getUserAuth function", async () => {
        const credCache : CredCache = {
            googleResponse: testGoogleResponse,
            userInfo: testProfile,
            type: "manager",
        };
        CookieManager.create("tokenResponse", JSON.stringify(credCache))
        mockFetch.mockResolvedValueOnce({
            json: async () => testProfile
        }).mockResolvedValueOnce({
            json: async () => {
                return {_id: 123, email: "weiwu@tamu.edu", type: "manager"}
            }
        })
        expect(await getUserAuth("manager")).toEqual(testProfile);

        CookieManager.delete("tokenResponse");
        vi.clearAllMocks();
    })
    it("should render login page with signup as cashier without crashing", () => {
        customRender(<Login type="cashier" signup/>);
    })
    it("should render login page without signup as cashier without crashing", () => {
        customRender(<Login type="cashier"/>);
    })
    it("should render login page as customer without crashing", () => {
        customRender(<Login type="customer"/>)
    })
    it("should render login page as manager without crashing", () => {
        customRender(<Login type="manager" />);
    })
    it("should render login page as admin without crashing", () => {
        customRender(<Login type="admin"/>)
    })
});
