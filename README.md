<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Convertly</h3>

  <p align="center">
    A full-stack media toolkit built with FastAPI and React, featuring batch image conversion/resizing, YouTube-to-MP3/MP4 extraction
    <br />
    <a href="https://github.com/kaustubhdoval/convertly"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/kaustubhdoval/convertly/issues">Report Bug</a>
    &middot;
    <a href="https://github.com/kaustubhdoval/convertly/issues">Request Feature</a>
  </p>
</div>

<img src="./demo.png" align="center" width="60%" alt="screenshot of homepage">

<!-- ABOUT THE PROJECT -->

## About The Project

A full-stack web application built with FastAPI (Python) and React that provides a suite of media utilities:
<br/>

<ul>
  <li>Batch Image Conversion (Supports PNG, JPG, ICO) </li>
  <li>Youtube to MP3/MP4</li>
  <li>Efficient File Handling - ZIP Packaging, Streaming Responses</li>
</ul>

## Run

To run the project locally in dev-mode, **cd into frontend**: <br/>
`npm run dev` <br/>
The existing start-dev.js file should startup both the backend and frontend services. The frontend should be available at `localhost:5173`

**To Run as a Docker Container**
Simply go to root directory and run `docker compose up` to build and run the container.
The Frontend Service will startup at `https://<container_computer>:3000` and the Backend API will be available at `https://<container_computer>:8000`

## Roadmap

<ul>
  <li>Get Metadata for Yt Downloads</li>
  <li>Better UI - more interactions for loading, processing etc. </li>
  <li>Cut down on dependencies</li>
</ul>

## Built With

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
