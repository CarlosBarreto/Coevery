using Orchard.Environment.Extensions;
using Orchard.UI.Resources;

namespace Orchard.Packaging {
    [OrchardFeature("Gallery")]
    public class ResourceManifest : IResourceManifestProvider {
        public void BuildManifests(ResourceManifestBuilder builder) {
            UI.Resources.ResourceManifest resourceManifest = builder.Add();
            resourceManifest.DefineScript("PackagingModulesAdmin").SetUrl("orchard-packaging-admin.js");
            resourceManifest.DefineStyle("PackagingAdmin").SetUrl("orchard-packaging-admin.css");
        }
    }
}
