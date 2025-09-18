export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">
                <h3>Assignment Name</h3>
            </label>

            <input id="wd-name" value="A1 - ENV + HTML" />
            <br />
            <br />
            <textarea id="wd-description" cols={50} rows={10}>
                The assignment is available online Submit a link to the landing page of
            </textarea>
            <br />
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option selected value="ASSINGMENTS">
                                ASSINGMENTS
                            </option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS"> EXAMS </option>
                            <option value="PROJECT">PROJECT</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option selected value="Percentage">
                                Percentage
                            </option>
                            <option value="Fraction">Fraction</option>
                            <option value="Integer">Integer</option>
                            <option value="Letter">Letter</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option selected value="Online">
                                Online
                            </option>
                            <option value="In-Person">In-Person</option>
                            <option value="Letter">Letter</option>
                            <option value="None">None</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        Online Entry Options
                        <br />
                        <input type="checkbox" name="check-entry-type" id="wd-text-entry" />
                        <label htmlFor="wd-text-entry">Text Entry</label>
                        <br />
                        <input
                            type="checkbox"
                            name="check-entry-type"
                            id="wd-website-url"
                        />
                        <label htmlFor="wd-website-url">Website URL</label>
                        <br />
                        <input
                            type="checkbox"
                            name="check-entry-type"
                            id="wd-media-recordings"
                        />
                        <label htmlFor="wd-media-recordings">Media Recordings</label>
                        <br />
                        <input
                            type="checkbox"
                            name="check-entry-type"
                            id="wd-student-annotation"
                        />
                        <label htmlFor="wd-student-annotation">Student Annotation</label>
                        <br />
                        <input
                            type="checkbox"
                            name="check-entry-type"
                            id="wd-file-upload"
                        />
                        <label htmlFor="wd-file-upload">File Upload</label>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        Assign
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to">Assign to</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <input id="wd-assign-to" value={"Everyone"} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <label htmlFor="wd-due-date">Due</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <input type="date" value="2024-05-13" id="wd-due-date" />
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <label htmlFor="wd-available-from">Available from</label>
                    </td>
                    <td>
                        <label htmlFor="wd-available-until">Until</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <input type="date" value="2024-05-06" id="wd-available-from" />
                    </td>
                    <td>
                        <input type="date" value="2024-05-20" id="wd-available-until" />
                    </td>
                </tr>
            </table>
            <hr />
            <div align="right">
                <button type="button">Cancel</button>
                <button type="button">Save</button>
            </div>
        </div>
    );
}
