<%-- _lcid="1033" _version="16.0.20203" _dal="1" --%>
<%-- _LocalBinding --%>
<%@ Page language="C#" MasterPageFile="~sitecollection/_catalogs/masterpage/ismail.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c"  %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	<SharePoint:EncodedLiteral runat="server" text="My HR Services"
		EncodeMethod='HtmlEncode' />
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
	
    <link href="./static/css/2.527ddec2.chunk.css" rel="stylesheet">
    <link href="./static/css/main.85fd8d82.chunk.css" rel="stylesheet">
    <meta name="GENERATOR" content="Microsoft SharePoint">
    <!-- <link rel="manifest" href="./manifest.json"> -->
    <link rel="shortcut icon" href="./favicon.ico">
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no">
	<meta name="theme-color" content="#000000" />
	<meta name="ProgId" content="SharePoint.WebPartPage.Document">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="CollaborationServer" content="SharePoint Team Web Site">
	<SharePoint:ScriptBlock runat="server">
		var navBarHelpOverrideKey = "wssmain";
	</SharePoint:ScriptBlock>
	<SharePoint:RssLink runat="server" />
	<SharePoint:ScriptLink language="javascript" name="bpstd.js" localizable="false" runat="server" />
	<style>
		Div.ms-titleareaframe {
			height: 0%;
		}

		.ms-pagetitleareaframe table {
			background: none;
		}

	</style>
</asp:Content>


<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">

<div id="root"></div>
<SharePoint:ScriptBlock runat="server">
    !function (e) { function r(r) { for (var n, p, l = r[0], a = r[1], f = r[2], c = 0, s = []; c < l.length; c++)p = l[c], Object.prototype.hasOwnProperty.call(o, p) && o[p] && s.push(o[p][0]), o[p] = 0; for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]); for (i && i(r); s.length;)s.shift()(); return u.push.apply(u, f || []), t() } function t() { for (var e, r = 0; r < u.length; r++) { for (var t = u[r], n = !0, l = 1; l < t.length; l++) { var a = t[l]; 0 !== o[a] && (n = !1) } n && (u.splice(r--, 1), e = p(p.s = t[0])) } return e } var n = {}, o = { 1: 0 }, u = []; function p(r) { if (n[r]) return n[r].exports; var t = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(t.exports, t, t.exports, p), t.l = !0, t.exports } p.m = e, p.c = n, p.d = function (e, r, t) { p.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t }) }, p.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, p.t = function (e, r) { if (1 & r && (e = p(e)), 8 & r) return e; if (4 & r && "object" == typeof e && e && e.__esModule) return e; var t = Object.create(null); if (p.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: e }), 2 & r && "string" != typeof e) for (var n in e) p.d(t, n, function (r) { return e[r] }.bind(null, n)); return t }, p.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return p.d(r, "a", r), r }, p.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r) }, p.p = "./"; var l = this["webpackJsonpyour-app"] = this["webpackJsonpyour-app"] || [], a = l.push.bind(l); l.push = r, l = l.slice(); for (var f = 0; f < l.length; f++)r(l[f]); var i = a; t() }([])
</SharePoint:ScriptBlock>
<script src="./static/js/2.a98f5dae.chunk.js"></script>
<script src="./static/js/main.bdb7adf8.chunk.js"></script>
</asp:Content>