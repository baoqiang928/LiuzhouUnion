using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using Model;

namespace MvcApplication1.Controllers
{
    public class DictionaryBigTreesViewController : ApiController
    {
        // GET api/DictionaryTrees/5
        public DictionaryTreeInfo Get(string id)
        {
            return new DictionaryTreeLogic().GetByID(id);
        }
        public class RadorInfo
        {
            private string fatherName = "";
            public string FatherName
            {
                get
                {
                    return fatherName;
                }

                set
                {
                    fatherName = value;
                }
            }

            private string maxValue = "";
            public string MaxValue
            {
                get
                {
                    return maxValue;
                }

                set
                {
                    maxValue = value;
                }
            }

            private string currentValue = "";
            public string CurrentValue
            {
                get
                {
                    return currentValue;
                }

                set
                {
                    currentValue = value;
                }
            }



        }
        public object Get([FromUri]string ProjectID, string TreeTypeID, string FatherIDs, string OpeType)
        {
            if (OpeType == "GetFathers")
            {
                if (!string.IsNullOrWhiteSpace(FatherIDs)) FatherIDs = FatherIDs.Replace("\"", "");
                List<DictionaryTreeInfo> fathers = new DictionaryTreeLogic().GetFathersTreeData(ProjectID, TreeTypeID, FatherIDs);
                List<TreeNodeInfo> nodes = new List<TreeNodeInfo>();
                foreach (DictionaryTreeInfo TreeInfo in fathers)
                {
                    nodes.Add(new TreeNodeInfo() { name = TreeInfo.Name, id = TreeInfo.ID.ToString(), isParent = true });
                }
                return nodes;
            }
            if (OpeType == "GetChildren")
            {
                if (!string.IsNullOrWhiteSpace(FatherIDs)) FatherIDs = FatherIDs.Replace("\"", "");
                List<DictionaryTreeInfo> Children = new DictionaryTreeLogic().GetSons(int.Parse(FatherIDs));
                List<TreeNodeInfo> nodes = new List<TreeNodeInfo>();
                foreach (DictionaryTreeInfo TreeInfo in Children)
                {
                    nodes.Add(new TreeNodeInfo() { name = TreeInfo.Name, id = TreeInfo.ID.ToString(), isParent = true, CoverPicUrl = new ArticleInfo().getimgurl(TreeInfo.Note) });
                }
                return nodes;
            }
            
            if (OpeType == "GetRador")
            {
                List<RadorInfo> RadorInfoList = new List<RadorInfo>();
                string[] ids = FatherIDs.Split(';');
                for (int i = 0; i < ids.Length; i++)
                {
                    if (string.IsNullOrWhiteSpace(ids[i])) continue;
                    //1. 获得父节点
                    DictionaryTreeInfo SonInfo = new DictionaryTreeLogic().GetByID(ids[i]);
                    DictionaryTreeInfo FatherInfo = new DictionaryTreeLogic().GetByID(SonInfo.FatherID.ToString());
                    //2.获得该父节点所有子节点
                    List<DictionaryTreeInfo> Sons = new DictionaryTreeLogic().GetSons(FatherInfo.ID);
                    //3.要把长度小于3，并且不是数字开头的去掉。
                    List<DictionaryTreeInfo> NewSons = new List<DictionaryTreeInfo>();
                    for (int j = 0; j < Sons.Count; j++)
                    {
                        if (Sons[j].Name.Length <= 3) continue;
                        var k = 0;
                        bool result = int.TryParse(Sons[j].Name[0].ToString(), out k);
                        if (!result) continue;
                        NewSons.Add(Sons[j]);
                    }
                    //4. 获得已经选中节点在list中位置。
                    for (int j = 0; j < NewSons.Count; j++)
                    {
                        if (NewSons[j].ID == int.Parse(ids[i]))
                        {
                            RadorInfo RadorInfo = new RadorInfo();
                            RadorInfo.FatherName = FatherInfo.Name;
                            RadorInfo.CurrentValue = (j + 1).ToString();
                            RadorInfo.MaxValue = NewSons.Count.ToString();
                            RadorInfoList.Add(RadorInfo);
                            break;
                        }
                    }
                }
                return RadorInfoList;
            }
            return new
            {
            };
        }
        //public object Get([FromUri]int FatherID, string TreeTypeID, string OpeType)
        //{
        //    if (OpeType == "SeparationPrinciple")
        //    {
        //        return new
        //        {
        //            Results = new DictionaryTreeLogic().GetBigTreeDataForSeparationPrinciple(FatherID)
        //        };
        //    }
        //    return new { };
        //}
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
                Results = new DictionaryTreeLogic().GetBigTreeDataForZTree(FatherID)
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


        public class QueryDataInfo
        {
            private string nodeID = "";

            public string NodeID
            {
                get
                {
                    return nodeID;
                }

                set
                {
                    nodeID = value;
                }
            }
            public string nodeName = "";

            public string NodeName
            {
                get
                {
                    return nodeName;
                }

                set
                {
                    nodeName = value;
                }
            }
            public string treeLevel = "";

            public string TreeLevel
            {
                get
                {
                    return treeLevel;
                }

                set
                {
                    treeLevel = value;
                }
            }

            public string projectID = "";
            public string ProjectID
            {
                get
                {
                    return projectID;
                }

                set
                {
                    projectID = value;
                }
            }

            public string treeTypeID = "";
            public string TreeTypeID
            {
                get
                {
                    return treeTypeID;
                }

                set
                {
                    treeTypeID = value;
                }
            }

        }

        // POST api/DictionaryTrees
        public object Post([FromBody]QueryDataInfo QueryDataInfo)
        {
            if ((QueryDataInfo.NodeID == null) || (QueryDataInfo.NodeID == "")) return new object();
            return new DictionaryTreeLogic().GetBigTreeDataForZTree(int.Parse(QueryDataInfo.NodeID));
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


