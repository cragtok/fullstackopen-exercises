import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import PatientListPage from "./PatientListPage";
import PatientInfoPage from "./PatientInfoPage";
import { Typography } from "@material-ui/core";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Container>
                    <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                        Patientor
                    </Typography>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary">
                        Home
                    </Button>
                    <Divider hidden />
                    <Routes>
                        <Route
                            path="/patients/:id"
                            element={<PatientInfoPage />}
                        />
                        <Route path="/" element={<PatientListPage />} />
                    </Routes>
                </Container>
            </Router>
        </div>
    );
};

export default App;
