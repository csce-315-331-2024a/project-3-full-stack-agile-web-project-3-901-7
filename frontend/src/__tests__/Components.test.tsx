import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Navbar from "../components/Navbar"
import { User } from "../types/dbTypes"
import { BrowserRouter } from "react-router-dom"
import { TextSizeProvider } from "../TextSizeContext"
import Modal from "../components/Modal"
import { vi } from "vitest"
import ManagerSearchbar from "../components/ManagerSearchbar"
import EditOrderPopup, { Order } from "../components/EditOrderPopUp"
import DeleteConfirmation from "../components/DeleteConfirmation"
import DataValidationWarning from "../components/DataValidationWarning"
import ConfirmationPopup from "../components/ConfirmationPopup"
import CashierHelpQueue from "../components/CashierHelpQueue"

describe("Testing Navbar Component", () => {
    const testProfile: User = {
        _id: 123,
        email: "weiwu@tamu.edu",
        name: "Warren Wu",
        given_name: "Warren",
        family_name: "Wu",
        picture: "https://lh3.googleusercontent.com/a/ACg8ocL9v0n1KM6ZOtKSYKkwg7IdtlwYGUmKlK4uJnx5WYunJuKQ06ao=s96-c",
    }
    const customRender = (ui:any, options?:any) => {
        return render(
            <BrowserRouter>
                <TextSizeProvider>
                {ui}
                </TextSizeProvider>
            </BrowserRouter>,
            options
        )
    }
    it("render navbar as admin", () => {
        customRender(<Navbar userInfo={testProfile} userType="admin"/>)
    })
    it("render navbar as manager", () => {
        customRender(<Navbar userInfo={testProfile} userType="manager"/>)
    })
    it("render navbar as cashier", () => {
        customRender(<Navbar userInfo={testProfile} userType="cashier"/>)
    })
    it("render navbar as customer", () => {
        customRender(<Navbar userInfo={testProfile} userType="customer"/>)
    })
    it("logout when user profile is clicked", () => {
        customRender(<Navbar userInfo={testProfile} userType="admin"/>)
        const profileButton = screen.getByText("Warren Wu");
        fireEvent.click(profileButton);
        expect(window.location.pathname).toBe("/cashier/login");
    })
    it("when user profile is null", () => {
        const newTestProfile:User = {...testProfile, picture: ""};
        customRender(<Navbar userInfo={newTestProfile} userType="customer"/>)
    })
    it("click on dropdown menu", () => {
        customRender(<Navbar userInfo={testProfile} userType="customer"/>)
        const dropdownButton = screen.getByLabelText("dropdown-button");
        fireEvent.click(dropdownButton);
        const outside = screen.getByText("Welcome Warren");
        fireEvent.mouseDown(outside);
    })
    it("click dark mode", () => {
        customRender(<Navbar userInfo={testProfile} userType="customer"/>)
        const darkModeButton = screen.getByLabelText("dark-mode");
        fireEvent.click(darkModeButton);
        fireEvent.click(darkModeButton);
    })
})

describe("Testing Modal Component", () => {
    const customRender = (ui:any, options?:any) => {
        return render(
            <BrowserRouter>
                <TextSizeProvider>
                {ui}
                </TextSizeProvider>
            </BrowserRouter>,
            options
        )
    }
    it("close button works properly", () => {
        const setOpen = vi.fn();
        customRender(<Modal message={"testing"} open={true} setOpen={setOpen}/>)
        const closeBtn = screen.getByText("close");
        fireEvent.click(closeBtn);

        expect(setOpen).toHaveBeenCalled();
    })
})

describe("Testing ManagerSearchbar Component", () => {
    const customRender = (ui:any, options?:any) => {
        return render(
            <BrowserRouter>
                <TextSizeProvider>
                {ui}
                </TextSizeProvider>
            </BrowserRouter>,
            options
        )
    }
    const setSearchTerm = vi.fn();
    const setShowLowStock = vi.fn();
    const handleRestock = vi.fn();
    const handleAddClick = vi.fn();
    beforeEach(() => {
        customRender(
            <ManagerSearchbar         
            searchPlaceholder='search ingredient'
            onSearch={setSearchTerm}
            conditions={[
                { title: "Show Low-Stock", callback: setShowLowStock },
            ]}
            actions={[
                { title: "Reorder Stock", callback: handleRestock },
                { title: "+", callback: handleAddClick },
            ]}
        />)
    })
    it("search bar renders properly", () => {
        expect(screen.getByText("Show Low-Stock")).toBeTruthy();
        expect(screen.getByText("Reorder Stock")).toBeTruthy();
    })
    it("search input works properly", () => {
        const searchInput = screen.getByPlaceholderText("search ingredient");
        fireEvent.change(searchInput, { target: { value: "burger" } });
        expect(setSearchTerm).toHaveBeenCalled();
    })
    it("show low stock button works properly", () => {
        const showLowStockButton = screen.getByText("Show Low-Stock");
        fireEvent.click(showLowStockButton);
        expect(setShowLowStock).toHaveBeenCalled();
    })
    it("reorder stock button works properly", () => {
        const reorderStockButton = screen.getByText("Reorder Stock");
        fireEvent.click(reorderStockButton);
        expect(handleRestock).toHaveBeenCalled();
    })
    it("check props.fill branch renders correctly", () => {
        customRender(
            <ManagerSearchbar         
            searchPlaceholder='search ingredient'
            onSearch={setSearchTerm}
            conditions={[
                { title: "Show Low-Stock", callback: setShowLowStock },
            ]}
            actions={[
                { title: "Reorder Stock", callback: handleRestock },
                { title: "+", callback: handleAddClick },
            ]}
            fill={true}
        />)
    })
})

describe("Testing EditOrderPopup Component", () => {
    const testOrder:Order = {
        _id: 1,
        numItems: 1,
        orderInfo: "Cheese Burger(1)",
        itemToQuantity: new Map([[1, 1]]),
        total: 50,
        dateTime: new Date(),
        status: "received",
    }
    const exampleRequestData = {
        _id: 1,
        name: "Bacon Cheeseburger",
        price: 8.29,
        category: "Burger",
        ingredientInfo: "bacon",
        ingredients: [
          {
            _id: 1,
            name: "bacon",
            quantity: 10,
            minQuantity: 10,
            unitPrice: 5.59,
            supplier: "BaconSupplier"
          }
        ],
        startDate: "2022-02-01",
        endDate: null,
        picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
        itemDesc: "itemDesc",
        available: false,
        id: 1
      }
    const onSave = vi.fn();
    const onCancel = vi.fn();
    const customRender = (ui:any, options?:any) => {
        return render(
            <BrowserRouter>
                <TextSizeProvider>
                {ui}
                </TextSizeProvider>
            </BrowserRouter>,
            options
        )
    }
    const mockFetch = vi.fn();
    global.fetch = mockFetch;
    afterEach(() => {
        vi.clearAllMocks();
    })
    it("fetches data and renders properly (assuming response is good)", () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => exampleRequestData,
        });
        customRender(<EditOrderPopup order={testOrder} onSave={onSave} onCancel={onCancel}/>)
        expect(screen.getByText("Edit Order")).toBeTruthy();
        expect(screen.getByText("Delete Item")).toBeTruthy();
    })
    it("renders properly assuming fetch fails", () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async() => exampleRequestData,
        });
        customRender(<EditOrderPopup order={testOrder} onSave={onSave} onCancel={onCancel}/>)
        expect(screen.getByText("Edit Order")).toBeTruthy();
        expect(screen.getByText("Delete Item")).toBeTruthy();
    })
    it("delete item button works properly", () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => exampleRequestData,
        });
        customRender(<EditOrderPopup order={testOrder} onSave={onSave} onCancel={onCancel}/>)
        const delItemBtn = screen.getByText("Delete Item");
        fireEvent.click(delItemBtn);
        expect(delItemBtn).toBeTruthy();
    })
    it("input change field works properly", () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => exampleRequestData,
        });
        customRender(<EditOrderPopup order={testOrder} onSave={onSave} onCancel={onCancel}/>)
        const itemInput:any = screen.getByDisplayValue("1");
        fireEvent.change(itemInput, { target: { value: "2" } });
        expect(itemInput.value).toBe("2");
    })
    it("ensures that handle save works properly", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => exampleRequestData,
        }).mockResolvedValueOnce({
            json: async () => {success: true},
        })
        customRender(<EditOrderPopup order={testOrder} onSave={onSave} onCancel={onCancel}/>)
        const saveBtn = screen.getByText("Save");
        fireEvent.click(saveBtn);
    })
})

describe("Testing DeleteConfirmation Component", () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    it("renders delete confirmation component", () => {
        render(<DeleteConfirmation onCancel={onCancel} onConfirm={onConfirm}/>)
    })
})

describe("Testing DataValidationWarning Component", () => {
    const message = "testing";
    const onCancel = vi.fn();
    it("renders data validation warning component", () => {
        render(<DataValidationWarning message={message} onCancel={onCancel}/>)
    })
    it("onclick for data validation warning works properly", () => {
        render(<DataValidationWarning message={message} onCancel={onCancel}/>)
        const closeBtn = screen.getByText("Close");
        fireEvent.click(closeBtn);
        expect(onCancel).toHaveBeenCalled();
    })
})

describe("Testing ConfirmationPopup Component", () => {
    const onClose = vi.fn();
    it("renders confirmation popup correctly with add", () => {
        render(<ConfirmationPopup action="add" onClose={onClose}/>)
    })
    it("renders confirmation popup correctly with edit", () => {
        render(<ConfirmationPopup action="edit" onClose={onClose}/>)
    })
    it("calls onclose on button click properly", () => {
        render(<ConfirmationPopup action="edit" onClose={onClose}/>)
        const closeBtn = screen.getByText("OK");
        fireEvent.click(closeBtn);
        expect(onClose).toHaveBeenCalled();
    })
})

describe("Testing CashierHelpQueue Component", () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;
    afterEach(() => {
        vi.restoreAllMocks();
    })
    it("renders cashier help queue component and fetches data properly", async() => {
        const mockResponse = [false, false, false, false, false];
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(mockResponse)
        })
        render(<CashierHelpQueue/>)
    })
    it("renders help ticket correclty", async () => {
        const mockResponse = [true, false, false, false, false];
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(mockResponse)
        })
        render(<CashierHelpQueue/>)
        await waitFor(() => {
            expect(screen.getByText("Help:")).toBeTruthy();
            expect(screen.getByText("Station 1.")).toBeTruthy();
        })
    })
    it("renders help ticket states correctly", async () => {
        const mockResponse = [true, false, false, false, false];
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(mockResponse)
        }).mockResolvedValueOnce({
            json: () => Promise.resolve({success: true})
        }).mockResolvedValueOnce({
            json: () => Promise.resolve([false, false, false, false, false])
        })
        render(<CashierHelpQueue/>)
        await waitFor(() => {
            const container = screen.getByText("Station 1.");
            fireEvent.mouseEnter(container);
            expect(screen.getByText("Resolve")).toBeTruthy();
            fireEvent.mouseLeave(container);
            expect(screen.getByText("Help:")).toBeTruthy();
            fireEvent.click(container);
        })
    })
})
