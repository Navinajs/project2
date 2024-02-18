//initialize the values
import { pool } from "./db.js"
import { validator } from "./validation.js"
const values = { id: "", name: "", years: "" };

//PostAPI function
export const create = (req, res) => {
    try {
        const { id1, id2 } = req.params;
        console.log(req.params);
        res.status(200).json({ msg: `${id1} and ${id2} is created` });
    } catch (e) {
        res.status(501).json({ err: e.message });
    }

}

//GetAPI function
export const read = (req, res) => {
    try {
        const { name, years } = req.body;
        res.status(200).json({ msg: `${name} is ${years} years old` });
    } catch (e) {
        res.status(404).json({ err: e.message });
    }

}

//PutAPI function
export const update = (req, res) => {
    try {
        const { name, years } = req.body;
        values.name = "preethi";
        values.years = "4";
        res.status(200).json({ msg: `${values.name}is ${values.years} years old is the  updated sentence` });
    } catch (e) {
        res.status(500).json({ err: e.message });
    }

}

//DeletAPI function
export const del = (req, res) => {
    try {
        values.name = "";
        values.years = "";
        res.status(200).json({ msg: `The data is deleted` });
    } catch (e) {
        res.status(500).json({ err: e.message });
    }

}

//middleware function
export const mid = (req, res, next) => {
    try {
        const { id } = req.body;
        if (id == 5) {
            next();
        } else {
            res.status(402).json({ msg: `Unauthorized` });
        }
    } catch (e) {
        res.status(500).json({ err: e.message })
    }
}

//function to create table
export const createTable = async (req, res) => {
    try {
        const createQuery = 'CREATE TABLE Employee(id INTEGER, name VARCHAR(30), work VARCHAR(40))';
        const result = await pool.query(createQuery);
        console.log("created table", result);
        if (result !== 0) {

            res.status(200).json({ code: 200, data: result, error: false, msg: "Table is created" });

        } else {
            res.status(500).json({ error: true, code: 500, msg: "Table is not created" });
        }
    } catch (e) {
        res.status(500).json({ code: 500, error: true, err: e.message });
    }
};

//function to insert data in table
export const insertTable = async (req, res) => {
    try {
        const insertQuery =
            "INSERT INTO Employee VALUES(1, 'Anjana', 'fuulstack'),(2,'Periyanayaki','fullstack'),(3,'Raagull Sakthivel','mobile app developer'),(4,'Ragul','mobile app developer')";
        const result = await pool.query(insertQuery);
        console.log("result", result);
        if (result) {
            res.status(200).json({
                code: 200,
                error: false,
                data: result,
                msg: "data is inserted",
            });
        } else {
            res.status(500).json({
                error: true,
                errorMsg: "data is not inserted successfully",
                code: 500,
            });
        }
    } catch (e) {
        res.status(500).json({ code: 500, error: true, err: e.message });
    }
};
//function to select id
export const selectId = async (req, res) => {
    try {
        const getID = req.params.id;
        const selectedID = `SELECT * FROM Employee WHERE id=${getID}`;
        const result = await pool.query(selectedID);
        console.log("result", result);
        if (result.rows.length != 0) {
            res.status(200).json({
                code: 200,
                error: false,
                data: result.rows,
                msg: "data found",
            });
        } else {
            res.status(404).json({
                error: true,
                errorMsg: "data not found",
                code: 404,
            })
        }


    } catch (e) {
        res.status(500).json({ code: 500, error: true, err: e.message });
    }
};
//function to delete id
export const deleteId = async (req, res) => {
    try {
        const getID = req.params.id;
        const deleteID = `DELETE * FROM Employee WHERE id=${getID}`;
        const result = await pool.query(deleteID);
        console.log("result", result);
        if (result) {
            res.status(200).json({
                code: 200,
                error: false,
                msg: "data is deleted",
            });
        } else {
            res.status(404).json({
                error: true,
                errorMsg: "data not found",
                code: 404,
            })
        }


    } catch (e) {
        res.status(500).json({ code: 500, error: true, err: e.message });
    }
};

// function for inserting dynamic data
export const insert_data = async (req, res) => {
    try {
        const { status, code, data, msg } = validator(req.body);
        if (!status) {
            return res.status(code).json({ error: true, errorMsg: message, code });
        }
        const values = [data.id, data.name, data.city];
        const insertData = 'INSERT INTO Employee VALUES($1,$2,$3)'
        const result = await pool.query(insertData, values);
        if (result) {
            return res.status(200).json({ error: false, msg: "data is inserted", data: result.rows, code })
        } else {
            res.status(500).json({ error: true, errorMsg: message, code: 500 });

        }
    } catch (e) {
        res.status(500).json({ error: true, errorMsg: e.message, code: 500 });
    }
}

//function to select id dynamically
export const selectedID = async (req, res) => {
    try {
        const select_id = [req.body.id];
        const selectQuery = 'SELECT * FROM Employee WHERE id=$1';
        const result = await pool.query(selectQuery, select_id);
        if (result) {
            return res.status(200).json({ status: true, msg: "data is selected", data: result.rows, code:200});
        }
        else {
            return res.status(500).json({ status: false, errorMsg: "data is not selected", code:500 });
        }
    } catch (e) {
        return res.status(500).json({ status: false, errorMsg: e.message, code:500 })
    }
}
