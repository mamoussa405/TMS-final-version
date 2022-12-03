// checklist template file
/* eslint-disable */

const template = `<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<title>Checklist</title>
<meta charset="utf-8" />
</head>

<body>
<table style="border-spacing: 0px; width: 100%;" cellpadding="5">
    <tbody>
        <tr>
            <td>
                <font size="2" face="arial,helvetica,sans-serif"><img
                    src="https://res.cloudinary.com/braideasy/image/upload/v1619612538/JESA-Logo_ov4lzy.jpg"
                    alt="JESA" title="JESA" width="145" height="auto" /></font>
            </td>
            <td>
                <font size="2" face="arial,helvetica,sans-serif">
                    <b>TASK ORDER CHECKLIST</b>
                </font>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table style="width: 100%;">
                    <tbody>
                        <tr>
                            <td style="width: 25%; text-align: right;">
                                <font size="2"
                                      face="arial,
                                      helvetica,
                                      sans-serif"> Task Order
                                </font>
                            </td>
                            <td style="width: 30%; text-align: right;">
                                <font size="2"face="arial,helvetica,sans-serif"></font>
                            </td>
                            <td style="width: 20%; text-align: left;">
                                <font size="2" face="arial,helvetica,sans-serif">
                                    Checklist
                                </font>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table style="border-spacing: 0px; width: 100%;" frame="box" rules="all">
                    <tbody>
                        <tr>
                            <td
                                style="border-color: #000000; width: 65%; text-align: left; background-color: #002060;">
                                <font size="2" face="arial,helvetica,sans-serif"><b>
                                        <font color="#FFF">PSAs</font>
                                    </b></font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;"></td>
                            <td align="center" style="border-color: #000000; width: 5%;"></td>
                            <td style="border-color: #000000; vertical-align: top;"></td>
                        </tr>
                        <tr>
                            <td style="border-color: #000000; width: 65%; text-align: left;">
                                <font size="2" face="arial,helvetica,sans-serif">Is it a TO with a Jacobs office for
                                    PSAs?</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isForPSACheckedYes]</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isForPSACheckedNo]</font>
                            </td>
                            <td style="border-color: #000000; vertical-align: top;" rowspan="3">
                                <font size="1" face="arial,helvetica,sans-serif">@#psaNotes</font>
                            </td>
                        </tr>
                        <tr>
                            <td style="border-color: #000000; width: 65%; text-align: left;">
                                <font size="2" face="arial,helvetica,sans-serif">If Yes, is the person billable?
                                </font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isBillableCheckedYes]</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isBillableCheckedNo]</font>
                            </td>
                        </tr>
                        <tr>
                            <td style="border-color: #000000; width: 65%; text-align: left;">
                                <font size="2" face="arial,helvetica,sans-serif">If not - GM authorization must be
                                    attached</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">
                                    [@#mustHaveGmAuthorizationCheckedYes]</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">
                                    [@#mustHaveGmAuthorizationCheckedNo]</font>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="border-color: #000000; width: 65%; text-align: left; background-color: #002060;">
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;"></td>
                            <td align="center" style="border-color: #000000; width: 5%;"></td>
                            <td style="border-color: #000000; vertical-align: top;"></td>
                        </tr>
                        <tr>
                            <td style="border-color: #000000; width: 65%; text-align: left;">
                                <font size="2" face="arial,helvetica,sans-serif">Are the rates verified? Explain
                                    verification method in notes.</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isRatesVerifiedCheckedYes]
                                </font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isRatesVerifiedCheckedNo]
                                </font>
                            </td>
                            <td style="border-color: #000000; vertical-align: top;" rowspan="5">
                                <font size="1" face="arial,helvetica,sans-serif">@#otherNotes</font>
                            </td>
                        </tr>
                        <tr>
                            <td style="border-color: #000000; width: 65%; text-align: left;">
                                <font size="2" face="arial,helvetica,sans-serif">Are the expenses included ? Explain
                                    basis for calculation on attached spreadsheet.</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isExpensesIncludedCheckedYes]
                                </font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isExpensesIncludedCheckedNo]
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td style="border-color: #000000; width: 65%; text-align: left;">
                                <font size="2" face="arial,helvetica,sans-serif">Have the multipliers been verified
                                    by country and office?</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">
                                    [@#isMultipliersVerifiedCheckedYes]</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">
                                    [@#isMultipliersVerifiedCheckedNo]</font>
                            </td>
                        </tr>
                        <tr>
                            <td style="border-color: #000000; width: 65%; text-align: left;">
                                <font size="2" face="arial,helvetica,sans-serif">Is the office location verified?
                                </font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isLocationVerifiedCheckedYes]
                                </font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isLocationVerifiedCheckedNo]
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td style="border-color: #000000; width: 65%; text-align: left;">
                                <font size="2" face="arial,helvetica,sans-serif">Are the WBS codes confirmed and
                                    open in accounting ?</font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isWbsConfirmedCheckedYes]
                                </font>
                            </td>
                            <td align="center" style="border-color: #000000; width: 5%;">
                                <font size="1" face="courier new,courier,monospace">[@#isWbsConfirmedCheckedNo]
                                </font>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table style="border-spacing: 0px; width: 100%;">
                    <tbody>
                        <tr>
                            <td></td>
                            <td align="right"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table style="border-spacing: 0px; width: 100%;">
                    <tbody>
                        <tr>
                            <td></td>
                            <td align="right"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table style="border-spacing: 0px; width: 100%;">
                    <tbody>
                        <tr>
                            <td></td>
                            <td align="right"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table style="border-spacing: 0px; width: 100%;">
                    <tbody>
                        <tr>
                            <td></td>
                            <td align="right"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table style="border-spacing: 0px; width: 100%;">
                    <tbody>
                        <tr>
                            <td>
                                <font size="2" face="arial,helvetica,sans-serif">&copy; JESA S.A 2020</font>
                            </td>
                            <td align="right">
                                <font face="arial,helvetica,sans-serif"><b>
                                        <font size="2">PCCO</font>
                                    </b></font>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
</body>

</html>`;

export default template;
