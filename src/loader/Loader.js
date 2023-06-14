import React from "react";

import "./loader.scss";

const Loader = () => {
    return (
        <div className="mt-5 text-center">
            <div>Table Data Loading</div>
            <div>Please Wait</div>
            <div className="mt-3 spinner-border text-dark" role="status"></div>
        </div>
    )
}

export default Loader;