using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Model
{
    public class ArticleInfo
    {
        int? id;
        /// <summary>
        /// ID
        /// </summary>
        public int? ID
        {
            get { return id; }
            set { id = value; }
        }
        private int dicID;
        public int DicID
        {
            get { return dicID; }
            set { dicID = value; }
        }
        private int serialNum;
        public int SerialNum
        {
            get { return serialNum; }
            set { serialNum = value; }
        }
        private string title;
        /// <summary>
        /// 名称
        /// </summary>
        public string Title
        {
            get { return title; }
            set { title = value; }
        }
        private string note;
        /// <summary>
        /// 内容
        /// </summary>
        public string Note
        {
            get { return note; }
            set { note = value; }
        }
        private string isTopArticle;
        /// <summary>
        /// 是否在首页显示
        /// </summary>
        public string IsTopArticle
        {
            get { return isTopArticle; }
            set { isTopArticle = value; }
        }
        private string remark;
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark
        {
            get { return remark; }
            set { remark = value; }
        }

        private DateTime? createDateTime;
        /// <summary>
        /// 創建時間
        /// </summary>
        public DateTime? CreateDateTime
        {
            get { return createDateTime; }
            set { createDateTime = value; }
        }

        public string FirstPicUrl
        {
            get
            {
                return getimgurl(note);
            }
        }

        private string firstPicUrl;


        #region 获取第一张图片
        /// <summary>
        /// 获取HTML文本的图片地址
        /// </summary>
        /// <param name="content"></param>
        /// <returns></returns>/
        /// 
        public string getimgurl(string html)
        {
            List<string> resultStr = new List<string>();
            html = html.ToLower().Replace("'", "").Replace("\"", "").Replace("<img ", "^");
            if (html.Split('^').Length > 2)
                html = html.Split('^')[1];
            else
                return "";
            html = html.ToLower().Replace("src=", "^").Replace("/>", "^");
            if (html.Split('^').Length > 2)
            {
                return html.Split('^')[1];
            }
            else
                return "";
        }
        #endregion


    }
}


