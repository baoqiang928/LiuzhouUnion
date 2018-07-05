﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class ImportData : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public class AtclInfo
        {
            public string ID = "";
            public string Title = "";
            public string Catalog = "";
            public string Note = "";
            public string PublicDate = "";
        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            #region 
            string src = @"
            ";
            #endregion

            List<AtclInfo> ArticleInfoList = GetArticleInfoList(src);

            //for (int i = 0; i < 50; i++)
            //for (int i = 51; i < 100; i++)
            //for (int i = 101; i < 150; i++)
            //for (int i = 151; i < 200; i++)
            //for (int i = 201; i < 250; i++)
            //for (int i = 251; i < 300; i++)
            //for (int i = 301; i < 350; i++)
            for (int i = 351; i < 397; i++)
            {
                AtclInfo item = ArticleInfoList[i];
                src = GetHttpWebRequest("http://kygroup.cc/szgw/www/?p=" + item.ID);
                item.Note = GetNote(src);
                if (item.Note.Contains("kygroup.cc"))
                {
                    DownLoadPic(item, "\"");
                }
                if (item.Note.Contains("kygroup.cc"))
                {
                    DownLoadPic(item, " ");
                }
                if (item.Note.Contains("kygroup.cc"))
                {
                    string aaa = "";
                }
                TextBox1.Text += "insert into [tbl_ArticleInfo]([ImportID],[Title],[ImportCatalog],[Note],[ImportPublicDate],[SerialNum]) select '"+ item.ID+ "','"+ item.Title.Replace("选择","")+ "','"+ item .Catalog+ "','"+ item .Note.Replace("'","''")+ "','','0';";
                TextBox1.Text += "\r\n";
            }
        }
        private void DownLoadPic(AtclInfo AtclInfo,string SplitStr)
        {
            List<string> PicUrls = GetPicUrls(AtclInfo.Note, SplitStr);
            foreach (var url in PicUrls)
            {
                string FileName = GetFileName(url);
                HttpDownloadFile(url, "d:\\oldpics\\"+ FileName);
                //WebClient w = new WebClient();
                //w.UploadFile("http://lzjggh.com/FileUploadHandler.ashx", "d:\\aaa\\" + NewFileName + ".xxx");
                AtclInfo.Note = AtclInfo.Note.Replace(url, "http://lzjggh.com/UploadResources/oldpics/" + FileName);
            }
        }
        private string GetFileName(string url)
        {
            url = url.Replace("kygroup.cc", "");
            foreach (var s in url.Split('/'))
            {
                if (!s.Contains(".")) continue;
                return s;
            }
            return "";
        }
        private List<string> GetPicUrls(string src,string SplitStr)
        {
            List<string> picurls = new List<string>();
            if (src.Contains("kygroup.cc"))
            {
                src = src.Replace("^", "");
                src = src.Replace("http://kygroup.cc/szgw/www/wp-content/", "^");
                src = src.Replace(SplitStr, "^");
                foreach (var item in src.Split('^'))
                {
                    if (!item.Contains("uploads/20")) continue;
                    if (item.Contains(" ")) continue;
                    picurls.Add("http://kygroup.cc/szgw/www/wp-content/"+item);
                }
            }

            return picurls;
        }

        public string HttpDownloadFile(string url, string path)
        {
            HttpWebRequest Request = WebRequest.Create(url) as HttpWebRequest;

            //WebProxy WebProxy = new WebProxy();
            //Uri NewUri = new Uri("http://" + proxyUrl + ":" + proxyPort);
            //WebProxy.Address = NewUri;
            //WebProxy.Credentials = new NetworkCredential(proxyAccount, proxyPassword);
            Request.UseDefaultCredentials = true;
            //Request.Proxy = WebProxy;

            HttpWebResponse Response = Request.GetResponse() as HttpWebResponse;
            Stream ResponseStream = Response.GetResponseStream();
            //path = HttpContext.Current.Server.MapPath(path);

            Stream stream = new FileStream(path, FileMode.Create);

            byte[] bArr = new byte[1024];
            int size = ResponseStream.Read(bArr, 0, (int)bArr.Length);
            while (size > 0)
            {
                stream.Write(bArr, 0, size);
                size = ResponseStream.Read(bArr, 0, (int)bArr.Length);
            }
            stream.Close();
            ResponseStream.Close();
            return path;
        }

        private List<AtclInfo> GetArticleInfoList(string src)
        {
            List<AtclInfo> ArticleInfoList = new List<WebApplication1.ImportData.AtclInfo>();
            src = src.Replace("^", "");
            src = src.Replace("for=\"cb-select-", "^");
           
            foreach (var item in src.Split('^'))
            {
                if (item.Contains("全选")) continue;
                if (item.Contains("DOCTYPE")) continue;
                AtclInfo AtclInfo = new AtclInfo();
                AtclInfo.ID = GetID(item);
                AtclInfo.Title = GetTitle(item);
                AtclInfo.Catalog = GetCatalog(item);
                AtclInfo.PublicDate = GetPublicDate(item);
                ArticleInfoList.Add(AtclInfo);
            }
            return ArticleInfoList;
        }
        private string GetID(string src)
        {
            src = src.Replace("^", "");
            src = src.Replace("\">", "^");
            return src.Split('^')[0];
        }
        private string GetTitle(string src)
        {
            src = src.Replace("^", "");
            src = src.Replace("\">", "^");
            src = src.Replace("</label>", "^");
            return src.Split('^')[1];
        }
        private string GetCatalog(string src)
        {
            src = src.Replace("^", "");
            src = src.Replace("edit.php?category_name=", "^");
            src = src.Replace("tags column-tags", "^");
            src = src.Split('^')[1];
            src = src.Replace(">", "^");
            src = src.Replace("<", "^");
            return src.Split('^')[1];
        }
        private string GetPublicDate(string src)
        {
            src = src.Replace("^", "");
            src = src.Replace("<abbr title=\"", "^");
            src = src.Replace("\">20", "^");
            return src.Split('^')[2];
        }
        private string GetNote(string src)
        {
            src = src.Replace("^", "");
            src = src.Replace("\r", "");
            src = src.Replace("\n", "");
            src = src.Replace("<div class=\"lead textContent\">", "^");
            src = src.Replace("</div></body>", "^");
            return src.Split('^')[1];
        }

        private string GetHttpWebRequest(string url)
        {
            try
            {
                Uri uri = new Uri(url);
                HttpWebRequest myReq = (HttpWebRequest)WebRequest.Create(uri);
                myReq.UserAgent = "User-Agent:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; .NET CLR 1.0.3705";
                myReq.Accept = "*/*";
                myReq.KeepAlive = true;
                myReq.Headers.Add("Accept-Language", "zh-cn,en-us;q=0.5");
                HttpWebResponse result = (HttpWebResponse)myReq.GetResponse();
                Stream receviceStream = result.GetResponseStream();
                StreamReader readerOfStream = new StreamReader(receviceStream, System.Text.Encoding.GetEncoding("utf-8"));
                string strHTML = readerOfStream.ReadToEnd();
                readerOfStream.Close();
                receviceStream.Close();
                result.Close();
                return strHTML;
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}