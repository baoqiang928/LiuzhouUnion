using System.Web.Http;
using BLL;
using Model;
using System.Collections.Generic;

namespace MvcApplication1.Controllers
{
    public class DictionaryBigTreesController : ApiController
    {
        // GET api/DictionaryTrees/5
        public DictionaryTreeInfo Get([FromUri]string id)
        {
            return new DictionaryTreeLogic().GetByID(id);
        }
        public class zTreeItem
        {
            public string id = "";
            public string pID = "";
            public string name = "";
            public bool isParent = true;
            //public bool open = false;
            //public bool nocheck = false;
        }
        public object Get([FromUri]string SonID, string OpeType)
        {
            if (OpeType == "GetFatherID")
            {
                return new DictionaryTreeLogic().GetByID(new DictionaryTreeLogic().GetFatherID(SonID));
            }
            if (OpeType == "GetDevidePrincipleInfo")
            {
                return new DictionaryTreeLogic().GetDevidePrincipleInfoByInventivePrincipleID(SonID);
            }
            if (OpeType == "GetArticlesDictionarySelector")
            {
                int totalItems = 0;
                int PagesLength = 0;
                List<DictionaryTreeInfo> DicList = new DictionaryTreeLogic().Query("0", "5", 1, 999, ref totalItems, ref PagesLength);
                List<zTreeItem> zTreeItemList = new List<zTreeItem>();
                string codes = "";
                foreach (DictionaryTreeInfo DictionaryTreeInfo in DicList)
                {
                    if (DictionaryTreeInfo.FatherID == null)
                    {
                        codes = codes + "{ id: " + DictionaryTreeInfo.ID.ToString() + ", pId: 0, name: \"" + DictionaryTreeInfo.Name + "\" , open: true, nocheck: true },";
                    }
                    else
                    {
                        codes = codes + "{ id: " + DictionaryTreeInfo.ID.ToString() + ", pId: " + DictionaryTreeInfo.FatherID.ToString() + ", name: \"" + DictionaryTreeInfo.Name + "\" },";
                    }

                    //zTreeItem zTreeItem = new zTreeItem();
                    //zTreeItem.id = DictionaryTreeInfo.ID.ToString();
                    //zTreeItem.name = DictionaryTreeInfo.Name;
                    //if (DictionaryTreeInfo.FatherID == null)
                    //{
                    //    //zTreeItem.isParent = true;
                    //    //zTreeItem.open = true;
                    //    //zTreeItem.nocheck = true;
                    //    zTreeItem.pID = "0";
                    //}
                    //else
                    //{
                    //    //zTreeItem.isParent = false;
                    //    zTreeItem.pID = DictionaryTreeInfo.FatherID.ToString();
                    //}
                    //zTreeItemList.Add(zTreeItem);
                }
                codes = "[" + codes.TrimEnd(',') + "]";
                return new
                {
                    Results = codes
                };
            }
            return new object();
        }
        public object Get([FromUri]int ProjectID, string TreeTypeID)
        {
            return new
            {
                Results = new DictionaryTreeLogic().GetBigTreeData(ProjectID.ToString(), TreeTypeID)
            };
        }
        public object Get([FromUri]int FatherID)
        {
            return new
            {
                Results = new DictionaryTreeLogic().GetBigTreeData(FatherID)
            };
        }
        // GET api/DictionaryTrees
        //public object Get([FromUri]string ProjectID, int currentPage, int itemsPerPage)
        //{
        //    int TotalItems = 0;
        //    int PagesLength = 0;
        //    List<DictionaryTreeInfo> DictionaryTreeInfoList = new DictionaryTreeLogic().Query(ProjectID, currentPage, itemsPerPage, ref TotalItems,ref PagesLength);
        //    return new
        //    {
        //        TotalItems = TotalItems,
        //        PagesLength = PagesLength,
        //        Results = DictionaryTreeInfoList
        //    };
        //}

        // POST api/DictionaryTrees
        public object Post([FromBody]DictionaryTreeInfo DictionaryTreeInfo)
        {
            return new DictionaryTreeLogic().SaveDictionaryTree(DictionaryTreeInfo);
        }

        public int Put([FromBody]DictionaryTreeInfo DictionaryTreeInfo)
        {
            return new DictionaryTreeLogic().SaveDictionaryTree(DictionaryTreeInfo);
        }

        // DELETE api/DictionaryTrees/5
        public void Delete(int id)
        {
            new DictionaryTreeLogic().DeleteDictionaryTree(id);
        }

        // DELETE api/DictionaryTrees/5
        public void Delete(string ids)
        {
            new DictionaryTreeLogic().DeleteDictionaryTree(ids);
        }

    }
}


