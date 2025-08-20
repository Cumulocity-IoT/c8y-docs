<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:outline="http://wkhtmltopdf.org/outline"
                xmlns="http://www.w3.org/1999/xhtml">
  <xsl:output doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
              doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
              indent="yes" />
  <xsl:template match="outline:outline">
    <html>
      <head>
        <title>Table of Contents</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

        <style>
        	/* External stylesheet for formatting the TOC produced by wkhtmltopdf 
             for the Cumulocity PDFs.
          */
                   
          h1 {
            text-align: center;
            font-size: 20px;
          }
          
          li div {  /* formatting for top-level div elements */
            border-bottom: 1px dotted rgb(200,200,200);
            margin-top: 15px;
            font-size: 20px;
            font-weight: bold;
          }
          
          li li div { /* formatting for lower-level div elements */
            border-bottom: 1px dotted rgb(200,200,200);
            margin-top: 2px;
            font-size: 15px;
            font-weight: normal;
          }

          span {float: right;}
          
          li {list-style: none;}
          
          /* remove all header levels of 4 and deeper from the TOC */
          ul ul ul ul { 
            display: none 
          }

          ul { /* formatting for top-level TOC elements */
            padding-left: 0em;
          }
          
          ul ul { /* formatting for lower-level TOC elements */
            padding-left: 2em; 
          }
          
          a {text-decoration:none; color: black;}
                          
        </style>
      </head>
      <body style="font-family:Helvetica;">
        <h1>Table of Contents</h1>
        <ul><xsl:apply-templates select="outline:item/outline:item"/></ul>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="outline:item">
    <li>
      <xsl:if test="@title!=''">
        <div>
          <a>
            <xsl:if test="@link">
              <xsl:attribute name="href"><xsl:value-of select="@link"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="@backLink">
              <xsl:attribute name="name"><xsl:value-of select="@backLink"/></xsl:attribute>
            </xsl:if>
            <xsl:value-of select="@title" /> 
          </a>
          <span> <xsl:value-of select="@page" /> </span>
        </div>
      </xsl:if>
      <ul>
        <xsl:comment>added to prevent self-closing tags in QtXmlPatterns</xsl:comment>
        <xsl:apply-templates select="outline:item"/>
      </ul>
    </li>
  </xsl:template>
</xsl:stylesheet>
