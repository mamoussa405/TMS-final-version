// worley's template file
/* eslint-disable */

const template = `
<!DOCTYPE html>
<html>
<style type="text/css">
    tbody {
        border-color: #FFFFFF;
    }

    thead {
        border-top-color: #FFFFFF;
    }
</style>

<head>
</head>

<body>
    <table rules="groups" frame="box" style="border-spacing: 0px;" cellpadding="5" border="0">
        <thead>
            <tr>
                <td align="center">
                    <font size="2"><img align="middle"
                            src="https://res.cloudinary.com/braideasy/image/upload/v1619612538/JESA-Logo_ov4lzy.jpg"
                            alt="JESA" title="JESA" width="145" vspace="0" hspace="10" height="auto" /></font>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <p align="center">
                        <font size="2"><b>Task Order Number @#toReference, Rev @#revision_no </b></font>
                    </p>
                    <p align="center">
                        <font size="2"><b>Pursuant to the Personnel Services Agreement, Effective 1st October 2016,
                                between (i) Jacobs Engineering Inc. (JE) and (ii) JESA, novated by JE to WORLEY
                            </b><b>Deutschland HoldCo GmbH</b><b> (WORLEY) on September 2, 2019, </b><b>(the
                                &ldquo;JPSA&rdquo;)</b></font>
                    </p>
                    <p align="center"></p>
                </td>
            </tr>
        </thead>
        <tbody style="border-top: #000000 !important;">
            <tr>
                <td>
                    <font size="2"><b>Date of Current Revision: @#dateRevision</b></font>
                </td>
            </tr>
            <tr>
                <td>
                    <font size="2"><b>PARTIES:</b></font>
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    <font size="2">@#jacobslegal_entityAddress</font>
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    <font size="2">(2) <b>JESA S.A.</b>, a corporation organized and existing under the laws of Morocco,
                        having an office and place of business at Immeuble 5, Zenith Millenium, Lot Attaoufik, Route de
                        Nouaceur, Sidi Maarouf, 20270 Casablanca, Morocco (&ldquo;JESA&rdquo;),</font>
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    <p>
                        <font size="2">Where capitalized terms are used in this Task Order and are not defined herein,
                            their meaning is as defined in the Personnel Services Agreement.</font>
                    </p>
                    <p>
                        <font size="2"><b>NOW IT IS HEREBY AGREED AS FOLLOWS:</b></font><br /><br />
                        <font size="2">1.&nbsp; Upon signature by or on behalf of the parties, this Task Order forms a
                            contract between the parties.</font>
                    </p>
                    <p>
                        <font size="2">2.&nbsp; This Task Order incorporates the terms, conditions and provisions of the
                            JPSA. Worley Affiliate and JESA Affiliate will be bound by the terms, conditions and
                            provisions of the JPSA as if it had been the original party to the JFSA in the same capacity
                            as Worley or JESA, respectively, and, accordingly for the purposes of this Task Order,
                            references in the JPSA to &ldquo;Worley&rdquo; shall be construed as references to
                            &ldquo;Worley Affiliate&rdquo;. Likewise, for the purposes of this Task Order, references in
                            the JPSA to &ldquo;JESA&rdquo; shall be construed as references to &ldquo;JESA
                            Affiliate&rdquo;.</font>
                    </p>
                    <p>
                        <font size="2">3.&nbsp; Where a JESA Affiliate or a Worley Affiliate has executed the present
                            Task Order, JESA Affiliate and Worley Affiliate will release JESA and Worley, and JESA and
                            Worley will release each other from any and all obligations and liabilities arising out of
                            or in connection with this Task Order.</font><br /><br />
                        <font size="2">4.&nbsp; Consultant will provide the Services and Deliverables listed in this
                            Task Order to Company in accordance with the JPSA.</font><br /><br />
                        <font size="2">5.&nbsp; Consultant will loan to Company the Loaned Personnel listed in column 1
                            of the exhibit to this Task Order for the Loan Periods listed in column 6 of the exhibit to
                            this Task Order.</font><br /><br />
                        <font size="2">6.&nbsp; Company will pay Consultant for the Loaned Personnel listed in the
                            exhibit to this Task Order in accordance with the JPSA. Such payments will be calculated in
                            accordance with the relevant part of Annex B and its amendments to the JPSA.</font>
                    </p>
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    <p>
                        <font size="2"><b>IN WITNESS WHEREOF</b> this Task Order has been entered into on the date first
                            above written.</font>
                    </p>
                    <table style="border-spacing: 0px; page-break-inside: avoid; width: 100%;" border="0">
                        <tbody>
                            <tr>
                                <td style="width: 50%;">
                                    <p>
                                        <font size="2"><b>@#legal_entity</b></font>
                                    </p>
                                    <p>
                                        <font size="2">WORLEY or WORLEY Affiliate</font><br /><br /><br /><br />
                                        <font size="2">_______________________________</font><br /><br />
                                        <font size="2">By: </font><br /><br /><br />
                                        <font size="2">Title: </font><br /><br /><br />
                                        <font size="2">Date: ____________________</font><br /><br />
                                    </p>
                                </td>
                                <td style="width: 50%;">
                                    <p>
                                        <font size="2"><b>JESA S.A.</b></font>
                                    </p>
                                    <p>
                                        <font size="2">JESA or JESA Affiliate</font><br /><br /><br /><br />
                                        <font size="2">______________________________</font><br /><br />
                                        <font size="2">By:&nbsp;</font><br /><br /><br />
                                        <font size="2">Title: General Manager</font><br /><br /><br />
                                        <font size="2">Date: __________________</font><br /><br />
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    <table style="border-spacing: 0px; page-break-inside: avoid; width: 100%;" border="0">
                        <tbody>
                            <tr>
                                <td><br />
                                    <font size="2"><b>Exhibit to Task Order Number - </b>@#toReference, <b>Rev
                                        </b>@#revision_no</font>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <font size="2"><b>The Loaned Personnel</b></font><br /><br />
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <table
                                        style="width: 100%; text-align: left; border-collapse: collapse; padding: 3px 4px;">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Name</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    See Attached Personnel List</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Job Title</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    See Attached Personnel List</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Location of Origin</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    @#departure</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Work Location</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    @#destination</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Start Date</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    @#startDate</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Loan Period</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    From @#startDate Through @#endDate</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Estimated Work Hours</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    @#estimatedWorkHours hours - See Attached Personnel List</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Base Labor Rate - BWR</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    See Attached Personnel List</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Transfer Multiplier</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    Per PSA &ndash; @#mt_cost</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Living Direct Cost &ndash; LDC Allowance - QLDCPSA@#classSuffix</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    Per PSA &ndash; Estimated at N/A</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Assignee Direct Cost &ndash; ADC Estimate</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    Per PSA &ndash; Estimated at @#adc @#currency</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Reimbursable Expenses (relating to the secondment)</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    All expenses incurred in the relocation to Morocco and the
                                                    performance of assigned duties</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Eligible for overtime?</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    Only by exception and with prior written approval of the JESA
                                                    General Manager</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Labor Related Cost</td>
                                                            </tr>
                                                            <tr>
                                                                <td>&nbsp;&nbsp;&nbsp;- @#toRef (includes ADC&rsquo;s)
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>&nbsp;&nbsp;&nbsp;- QPSALDC@#classSuffix
                                                                    (LDC&rsquo;s)</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width: 33%;">Hours</td>
                                                                <td style="width: 33%;">Cost</td>
                                                                <td style="width: 33%;">WBS Task</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 33%;">@#estimatedWorkHours</td>
                                                                <td style="width: 33%;">@#totalCost @#currency</td>
                                                                <td style="width: 33%;" rowspan="2">@#taskCodes;</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 33%;">N/A</td>
                                                                <td style="width: 33%;">N/A</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>In Country Travel Cost</td>
                                                            </tr>
                                                            <tr>
                                                                <td>&nbsp;&nbsp;&nbsp;- @#toRef (Exp. Reports)</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width: 33%;">&nbsp;</td>
                                                                <td style="width: 33%;">&nbsp;</td>
                                                                <td style="width: 33%;">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 33%;">&nbsp;</td>
                                                                <td style="width: 33%;">@#expenses @#currency</td>
                                                                <td style="width: 33%;">@#wbs_task_code</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    Total Approved Cost</td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width: 33%;">&nbsp;</td>
                                                                <td style="width: 33%;">@#totalApprovedCost @#currency
                                                                </td>
                                                                <td style="width: 33%;">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table
                                        style="width: 100%; text-align: left; border-collapse: collapse; padding: 3px 4px;">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="border: 1px solid #555555; background-color: #eeeeee; padding: 3px 4px; width: 43%; font-size: 13px; font-weight: bold;">
                                                    <span>Accountant Project Setup Information:</span></td>
                                                <td
                                                    style="border: 1px solid #000000; width: 57%; background: #FFFFFF; font-weight: normal;">
                                                    <span style="background-color: yellow; color: black;">DO NOT SET
                                                        <span>@#toRef&nbsp;</span>PROJECT UP AS A JESA PROJECT! THIS IS
                                                        FOR INVOICING ONLY</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
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
