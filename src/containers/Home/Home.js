import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h2 className="home-header">This is a contract drafting tool, please sign in to use!</h2>
            <div className="home-description">
                <div className="disclaimer">
                    <p><b>*DISCLAIMER:</b> Due to limitations of the package <a href="https://github.com/evidenceprime/html-docx-js">html-docx-js</a> which is used to download your finished contracts, you will only be able to view downloaded contracts in Microsoft Word versions 2007 and newer. Full details are available <a href="https://github.com/evidenceprime/html-docx-js">here</a>. A new exporting package / tool will be included in a future update.</p>
                    <p><b>*DISCLAIMER 2:</b> Due to the way Github Pages handles routing, you cannot refresh your browser anywhere other than this page. I am currently looking into workarounds including using react-router's HashRouter.</p>
                    <i>The code for this project will be available on github when version 1.2 is released by the end of April.</i>
                </div>
                <br />
                <div className="home-description-section" id="what-is-this">
                    <h3>"What is this and How Do I Use It?"</h3>
                    <p>This is a basic contract drafting tool originally made for lawyers, but limited in use only by your imagination.</p>
                    <p>This contract drafting tool allows you to create reusable and modifiable 'Templates' of contracts which contain 'variables'. Variables are things like the current date or the address of a residence - things that change every time you fill out a template. We also ask you to create a 'variable description' for each variable. This is what you will see when you decide to create a contract from your template.</p>
                    <p>For each type of contract you work with, simply navigate to the top left of your navigation bar and click on "Create Template". Here, you can choose how many clauses you want and how many variables you want in each clause. Simply fill in the content, and click either save or exit.</p>
                    <p>When you're done creating a template and exit the creation page, you will be redirected to your user page (also in the navigation bar). Here, you can view your completed contract templates. If you realize that you made a mistake or simply wish to tweak an existing template for another use, you can edit your templates and even save them as new templates.</p>
                    <p>If you wish to create a downloadable contract, just click the "Fill" button of the template you wish to fill out. You'll be presented with a list of questions you created that correspond to the variables you included in your template. Just hit the fill button by the input, and the preview on the right will instantly reflect your changes. If you want to do a last minute edit to your contract, you can do that too in the editor on the right. When you're all finished, just click the "Save As Word" button to download your contract to your computer!</p>
                    <i>*NOTE: As of now, only you can view your templates, though template sharing may be included in a future update.</i>
                </div>
                <div className="home-description-section" id="why-did-you">
                    <h3>"Why Did You Make This?"</h3>
                    <p>This contract drafting tool is a quick recreation of an MVP that I started coding as part of a startup venture called  ProvenLaw in November 2019. </p>
                    <p>Originally a "Contract Drafting Tool Powered by GPT-2", our company's product pivoted heavily after our interviews and tech demos with lawyers revealed a general mistrust of AI and a level of specificity we were not immediately ready for. We decided to put AI on the backburner and focus on already existing contracts. Our new product was essentially a contract marketplace, where large law firms or experienced independent firms with the existing contract templates could sell them to smaller firms. Our inclusion of this - now free - drafting tool would help even smaller law firms who had their contracts in paper binders transition to a more modern contract management system. In startup jargon, we were "democratizing access to legal know-how"</p>
                    <p>We had the great opportunity to be a part of multiple startup accelerators like UC Hastings LexLab, UC Berkeley Skydeck's Hotdesk, UC Launch, the Haas School of Business's AMP (Social Good) program, and even won some money from the Trione Student Venture Fund (also through Haas).</p>
                    <p>Unfortunately however, after Covid-19 was declared a pandemic and California experienced its first shelter-at-home order, we deemed the company no longer profitable and I left the company while my cofounders looked to the German law market to start from scratch. Since then, I completely recoded the MVP, redesigned it, added a few features, and presented it here as a passion project. I have a lot of improvements in mind and will continue to update my tool whenever I have free time.</p>
                    <p>Interested talking about my experience, my old company, or hiring me? You can contact me at <a href="mailto:abhinav@asbhaskar.com">abhinav@asbhaskar.com</a> and view the rest of my portfolio at <a href="asbhaskar.com">asbhaskar.com</a>.</p>
                </div>
                <div className="home-description-section" id="tech-details">
                    <h3>Technical Details and Differences from Previous Iterations</h3>
                    <ul>
                        <li>This project was built with React.js. A previous iteration was built with Angular 7.</li>
                        <li>This tool uses Draftjs as its Rich Text Editor, with added functionality based loosely on Microsoft Word, the preferred tool of lawyers.</li>
                        <li>This tool is hosted as a frontend application on Github Pages. A previous iteration was hosted on both AWS EC2 and an S3 bucket at different times during development.</li>
                        <li>This tool uses the Firebase package to communicate with a Realtime Database and authenticate users through google. A previous iteration used a REST API and React Redux to communicate with Firebase and any other services we used and store data. </li>
                    </ul>
                    <p>It should also be noted that in addition to these changes, the entire application was rewritten from the ground up and redesigned to remove branding.</p>
                </div>
                <div className="home-description-section" id="changelog">
                    <h3>Changelog</h3>
                    <p>*Updates will tentatively arrive every few weeks to a month. Whenever I have time, really.</p>
                    <ul>
                        <li><b>Version 1.1.4</b> - 4/22/21. </li>
                        <ul>    
                            <li>Added a snackbar response when templates are saved.</li>
                            <li>Added temporary formatting to improve the template preview function. Font sizes and formatting will be restandardized in a future update.</li>
                            <li>Fixed a bug on the User Homepage where only three templates would appear on each line.</li>
                            <li>Fixed a bug where after saving, the content blocks of editors would be stringified leading to errors on template preview.</li>
                        </ul>
                        <li><b>Version 1.1.3</b> - 4/8/21. </li>
                        <ul>    
                            <li>Fixed issues with deleting clauses on Create page.</li>
                        </ul>
                        <li><b>Version 1.1.2</b> - 3/30/21. </li>
                        <ul>    
                            <li>Code Refactor Part 1/2.</li>
                            <li>Minor UI Improvements.</li>
                            <li>Navbar update - Improved rendering and mobile UI.</li>
                        </ul>
                        <li><b>Version 1.1.1</b> - 3/3/21. </li>
                        <ul>
                            <li>Fixed a bug where user page would not refresh data on template deletion resulting in improper styling.</li>
                        </ul>
                        <li><b>Version 1.1.0</b> - 3/2/21. </li>
                        <ul>
                            <li>Responsivity added.</li>
                        </ul>
                        <li><b>Version 1.0.0</b> - Initial Launch. </li>
                        <ul>
                            <li>Drafting tool is Live!</li>
                        </ul>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Home
