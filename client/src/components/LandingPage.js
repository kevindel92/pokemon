import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div>
            <h1>Welcome to PokeApp!</h1>
            <Link to="/home">
                <button>Lest's Go!</button>
                </Link>
        </div>
    );
};