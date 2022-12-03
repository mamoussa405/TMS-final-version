// hourly split template file
/* eslint-disable */

const template = `<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
</head>

<body>
<p><img src="https://res.cloudinary.com/braideasy/image/upload/v1619612538/JESA-Logo_ov4lzy.jpg" alt="JESA"
        title="JESA" width="145" height="auto" /></p>
<h1>
    <font size="3" face="helvetica,arial,sans-serif">Task Order Hours Split</font>
</h1>
<table style="border-spacing: 0px; border-width: 1px; border-color: #696969; width: 100%;" cellpadding="4">
    <tbody>
        <tr>
            <td style="border-color: #696969;">
                <font size="1"><b>first_name</b></font>
            </td>
            <td style="border-color: #696969;">
                <font size="1"><b>last_name</b></font>
            </td>
            <th style="border-color: #696969;">
                <font size="1"><b>Function</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>WBS</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>BWR</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>Bare Cost</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>JESA Billed Rate</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>Total Labor Cost</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>Total Labor Hours</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-1</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-2</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-3</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-4</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-5</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-6</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-7</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-8</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-9</b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M-10<b></b></b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1"><b>M<b>-11</b></b></font>
            </th>
            <th style="border-color: #696969;">
                <font size="1">M-12</font>
            </th>
        </tr>
        <!--@>roundedSplitHours-->
        %%Mss%%
        <!--@<roundedSplitHours-->
    </tbody>
</table>
<p></p>
<p>
    <font size="1"><b>
            <font face="helvetica,arial,sans-serif">Expenses</font>
        </b></font>
</p>
<table style="border-spacing: 0px; width: 50%;" cellpadding="4" border="1">
    <tbody>
        <tr>
            <td align="center">
                <font size="1" face="arial,helvetica,sans-serif">
                    <b>WBS Task Code</b>
                </font>
            </td>
            <td align="center">
                <font size="1" face="arial,helvetica,sans-serif">
                    <b>Expenses</b>
                </font>
            </td>
        </tr>
        <tr>
            <td align="center">
                <font size="1" face="arial,helvetica,sans-serif">%%wbs%%</font>
            </td>
            <td align="center">
                <font size="1">
                    <font face="arial,helvetica,sans-serif">%%expenses%%</font>
                    <font face="arial,helvetica,sans-serif"><br /></font>
                </font>
            </td>
        </tr>
    </tbody>
</table>
<p>
    <font size="1">&copy; JESA S.A.</font>
</p>
</body>

</html>`;

export default template;
