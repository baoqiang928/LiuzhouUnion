using System;
using System.Collections.Generic;
using System.Text;
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

    }
}


