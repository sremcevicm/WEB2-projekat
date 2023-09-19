//import logo from './logo.svg';
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { PrivateRoute } from "./components/PrivateRoutes";
import { ProfileUpdate } from "./components/ProfileUpdate/ProfileUpdate";
import { AllOrders } from "./components/AllOrders/AllOrders";
import { VerifyUsers } from "./components/VerifyUsers/VerifyUsers";
import { NewOrder } from "./components/NewOrder/NewOrder";
import { OldOrders } from "./components/OldOrders/OldOrders";
import { OrderDetails } from "./components/OrderDetails/OrderDetails";
import { MyOrders } from "./components/MyOrders/MyOrders";
import { NewOrders } from "./components/NewOrders/NewOrders";
import { UpdateProductForm } from "./components/UpdateProduct/UpdateProduct";
import { MyProducts } from "./components/MyProducts/MyProducts";
import { AddNewProduct } from "./components/AddNewProduct/AddNewProduct";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/my-profile"
                    element={
                        <PrivateRoute
                            allowedRoles={["Admin", "Seller", "Buyer"]}
                            component={ProfileUpdate}
                        />
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute
                            allowedRoles={["Admin", "Seller", "Buyer"]}
                            component={Dashboard}
                        />
                    }
                />
                <Route
                    path="/verify-users"
                    element={
                        <PrivateRoute
                            allowedRoles={["Admin"]}
                            component={VerifyUsers}
                        />
                    }
                />
                <Route
                    path="/my-products"
                    element={
                        <PrivateRoute
                            allowedRoles={["Seller"]}
                            component={MyProducts}
                        />
                    }
                />
                <Route
                    path="/add-new-product"
                    element={
                        <PrivateRoute
                            allowedRoles={["Seller"]}
                            component={AddNewProduct}
                        />
                    }
                />
                <Route
                    path="/update-product"
                    element={
                        <PrivateRoute
                            allowedRoles={["Seller"]}
                            component={UpdateProductForm}
                        />
                    }
                />
                <Route
                    path="/new-order"
                    element={
                        <PrivateRoute
                            allowedRoles={["Buyer"]}
                            component={NewOrder}
                        />
                    }
                />
                <Route
                    path="/old-orders"
                    element={
                        <PrivateRoute
                            allowedRoles={["Buyer"]}
                            component={OldOrders}
                        />
                    }
                />
                <Route
                    path="/order-details"
                    element={
                        <PrivateRoute
                            allowedRoles={["Buyer", "Admin", "Seller"]}
                            component={OrderDetails}
                        />
                    }
                />
                <Route
                    path="/new-orders"
                    element={
                        <PrivateRoute
                            allowedRoles={["Seller"]}
                            component={NewOrders}
                        />
                    }
                />
                <Route
                    path="/my-orders"
                    element={
                        <PrivateRoute
                            allowedRoles={["Seller"]}
                            component={MyOrders}
                        />
                    }
                />
                <Route
                    path="/all-orders"
                    element={
                        <PrivateRoute
                            allowedRoles={["Admin"]}
                            component={AllOrders}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
