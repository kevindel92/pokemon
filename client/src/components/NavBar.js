import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div>
            <nav>
                <div>
                    <Link to="/create">
                        <button>Create your Pokemon!</button>
                    </Link>
                </div>
            </nav>
        </div>
    );
};