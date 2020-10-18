import React, { useState, useContext } from "react";
import { Context } from "./../utils/Context";

const Login = () => {
    const [objectData, setObjectData] = useState({ username: "", password: "" });
    const { logins, history } = useContext(Context);
    const [, setLogin] = logins;
    const [error, setError] = useState({ username: null, password: null });
    const [feed, setfeed] = useState("");

    const handleChange = (e) => {
        const name = e.target.name;
        setObjectData({ ...objectData, [name]: e.target.value });
    };

    const handleValidation = () => {
        let errors = {};
        let valid = true;
        if (!objectData.username) {
        errors.title = "Username is required";
        valid = false;
        }

        if (!objectData.password) {
        errors.description = "Password is required";
        valid = false;
        }

        setError({ ...error, errors });
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = handleValidation();
        if (valid) {
        if (objectData.username === "username" && objectData.password === "qwer") {
            sessionStorage.setItem("login", true);
            setLogin(true);
            history.push("/");
        } else {
            setfeed("Dilarang Masuk");
        }
        }
    };

    return (
        <div style={{ backgroundColor: '#FFF', width: '40%', margin: '10px auto', padding: '20px' }}>
            <h2 style={{textAlign: 'center'}}>LOGIN</h2>
            <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <table style={{margin: '0 auto', width: '70%'}}>
                    <tr>
                        <td><center><input type="text" name="username" id="username" required value={objectData.username} onChange={handleChange} style={{margin: '0 auto', padding: '10px 5px', width: '90%', border: '0px', borderBottom: '1px solid #333'}} placeholder="Username" /></center></td>
                    </tr>
                    <tr>
                        <td><center><input type="password" name="password" id="password" required value={objectData.password} onChange={handleChange} style={{margin: '0 auto', padding: '10px 5px', width: '90%', border: '0px', borderBottom: '1px solid #333'}} placeholder="Password" /></center></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><center><input type="submit" value="Login" style={{padding: '10px 80px', justifyContent: 'center', border: '0px', borderRadius: '20px', backgroundColor: '#22AAA1', color: '#FFF'}} /></center></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><center><h4 style={{color: 'red', textTransform: 'uppercase'}}>{feed}</h4></center></td>
                    </tr>
                </table>
            </form>
        </div>
    );
};

export default Login;