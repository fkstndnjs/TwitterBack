import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();

express.json();

morgan();

helmet();

cors;
