#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# 3D Web Boilerplate — MCP + Skills Preflight Script
#
# Checks and configures the full stack before executing the
# Corpus to Boilerplate master prompt.
#
# Author: Prof. Rubén Vega Balbás, PhD <ruben.vega@udit.es>
# =============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PASS="${GREEN}✓${NC}"
FAIL="${RED}✗${NC}"
WARN="${YELLOW}⚠${NC}"
INFO="${BLUE}ℹ${NC}"

ready=0
action=0
optional=0

header() {
  echo ""
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BLUE}  $1${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

pass() {
  echo -e "  ${PASS} $1"
  ((ready++))
}

fail() {
  echo -e "  ${FAIL} $1"
  echo -e "     ${RED}→ $2${NC}"
  ((action++))
}

warn() {
  echo -e "  ${WARN} $1"
  echo -e "     ${YELLOW}→ $2${NC}"
  ((optional++))
}

info() {
  echo -e "  ${INFO} $1"
}

# =============================================================================
# 1. SYSTEM PREREQUISITES
# =============================================================================
header "1. System Prerequisites"

# Node.js
if command -v node &>/dev/null; then
  node_ver=$(node --version)
  pass "Node.js installed: ${node_ver}"
else
  fail "Node.js not found" "Install via nvm: nvm install 22"
fi

# npm
if command -v npm &>/dev/null; then
  npm_ver=$(npm --version)
  pass "npm installed: ${npm_ver}"
else
  fail "npm not found" "Comes with Node.js"
fi

# npx
if command -v npx &>/dev/null; then
  pass "npx available"
else
  fail "npx not found" "Comes with npm 5.2+"
fi

# Git
if command -v git &>/dev/null; then
  pass "git installed"
else
  fail "git not found" "brew install git"
fi

# =============================================================================
# 2. DOCKER + DEVIAC GATEWAY
# =============================================================================
header "2. Docker + DevIAC Gateway"

# Docker
if command -v docker &>/dev/null; then
  if docker info &>/dev/null 2>&1; then
    pass "Docker daemon running"
  else
    fail "Docker installed but daemon not running" "Start Docker Desktop or: open -a Docker"
  fi
else
  warn "Docker not installed" "Required only if using DevIAC gateway. brew install --cask docker"
fi

# Docker Compose
if command -v docker &>/dev/null && docker compose version &>/dev/null 2>&1; then
  compose_ver=$(docker compose version --short 2>/dev/null || echo "unknown")
  pass "Docker Compose available: ${compose_ver}"
else
  warn "Docker Compose not available" "Required for DevIAC. Included with Docker Desktop."
fi

# DevIAC repo
DEVIAC_PATH="${DEVIAC_PATH:-$HOME/src/deviac}"
if [ -d "$DEVIAC_PATH" ]; then
  pass "DevIAC repo found: ${DEVIAC_PATH}"

  # Check .env
  if [ -f "$DEVIAC_PATH/hosts/tanit/.env" ]; then
    pass "DevIAC .env configured"
  else
    fail "DevIAC .env missing" "cd $DEVIAC_PATH && cp hosts/tanit/.env.example hosts/tanit/.env && edit PG_PASSWORD"
  fi

  # Check mkcert certs
  if [ -f "$DEVIAC_PATH/hosts/tanit/traefik/cert.pem" ]; then
    pass "mkcert certificates present"
  else
    fail "mkcert certificates missing" "cd $DEVIAC_PATH && make init-certs"
  fi

  # Check if gateway is running
  if docker ps 2>/dev/null | grep -q "mcp-gateway"; then
    pass "DevIAC MCP gateway is running"
  else
    warn "DevIAC MCP gateway not running" "cd $DEVIAC_PATH && make up-tanit"
  fi
else
  warn "DevIAC repo not found at ${DEVIAC_PATH}" "Set DEVIAC_PATH env var or skip if not using DevIAC"
fi

# =============================================================================
# 3. OLLAMA (for DevIAC knowledge MCP)
# =============================================================================
header "3. Ollama (Local Models)"

if command -v ollama &>/dev/null; then
  pass "Ollama installed"

  # Check if Ollama is serving
  if curl -s http://127.0.0.1:11434/api/tags &>/dev/null; then
    pass "Ollama is serving on :11434"

    # Check for required embedding model
    if ollama list 2>/dev/null | grep -q "nomic-embed-text"; then
      pass "nomic-embed-text model available"
    else
      fail "nomic-embed-text model not pulled" "ollama pull nomic-embed-text"
    fi
  else
    warn "Ollama not serving" "ollama serve & (or: brew services start ollama)"
  fi
else
  warn "Ollama not installed" "Required for DevIAC knowledge MCP. brew install ollama"
fi

# =============================================================================
# 4. PORT AVAILABILITY
# =============================================================================
header "4. Port Availability"

check_port() {
  local port=$1
  local label=$2
  if lsof -i ":${port}" &>/dev/null 2>&1; then
    # Check if it's our expected service
    local proc
    proc=$(lsof -i ":${port}" -t 2>/dev/null | head -1)
    if [ -n "$proc" ]; then
      local pname
      pname=$(ps -p "$proc" -o comm= 2>/dev/null || echo "unknown")
      warn "Port ${port} in use by ${pname}" "${label} — may conflict or be expected"
    fi
  else
    pass "Port ${port} available (${label})"
  fi
}

check_port 5173 "Vite dev server"
check_port 5432 "PostgreSQL (DevIAC)"
check_port 8100 "MCP Gateway (DevIAC)"
check_port 80   "Traefik HTTP (DevIAC)"
check_port 443  "Traefik HTTPS (DevIAC)"

# =============================================================================
# 5. MCP SERVERS
# =============================================================================
header "5. MCP Servers"

info "MCP servers are configured in your editor, not globally."
info "Verify these are connected in your editor's MCP settings:"
echo ""
echo -e "  ${BLUE}Priority 1:${NC} Browser MCP (cursor-ide-browser) — built into Cursor"
echo -e "  ${BLUE}Priority 2:${NC} Stitch MCP — google-labs-code/stitch-skills"
echo -e "  ${BLUE}Priority 3:${NC} 21st.dev Magic — npx @21st-dev/cli@latest install"
echo -e "  ${BLUE}Priority 4:${NC} Nano Banana 2 — daveremy/nano-banana-2-mcp (needs GEMINI_API_KEY)"
echo -e "  ${BLUE}Priority 5:${NC} DevIAC Gateway — stdio from services/mcp/ or HTTP via mcp.crea-comm.loc"

# Check for Gemini API key (needed by Stitch and Nano Banana 2)
if [ -n "${GEMINI_API_KEY:-}" ]; then
  pass "GEMINI_API_KEY is set"
else
  warn "GEMINI_API_KEY not set" "Required for Stitch and Nano Banana 2. export GEMINI_API_KEY=your-key"
fi

# Check for 21st.dev API key
if [ -n "${TWENTYFIRST_API_KEY:-}" ]; then
  pass "21st.dev API key is set"
else
  warn "21st.dev API key not set" "Get one at https://21st.dev and set TWENTYFIRST_API_KEY"
fi

# =============================================================================
# 6. SKILLS
# =============================================================================
header "6. Skills"

info "Skills are installed per-editor. Verify in your editor's skills/extensions:"
echo ""
echo -e "  ${BLUE}UI UX Pro Max${NC} — Design intelligence skill (32k+ GitHub stars)"
echo -e "     Install in Cursor, Claude Code, or Windsurf as an agent skill."
echo -e "     GitHub: search 'ui-ux-pro-max-skill'"

# Check Cursor rules exist in current workspace
if [ -d ".cursor/rules" ]; then
  rule_count=$(find .cursor/rules -name "*.mdc" 2>/dev/null | wc -l | tr -d ' ')
  pass "Cursor rules directory found (${rule_count} .mdc files)"
else
  warn "No .cursor/rules/ in current directory" "Rules will be generated by the boilerplate prompt"
fi

# Check for CLAUDE.md
if [ -f "CLAUDE.md" ]; then
  pass "CLAUDE.md found"
else
  warn "No CLAUDE.md in current directory" "Will be generated by the boilerplate prompt"
fi

# Check for .windsurfrules
if [ -f ".windsurfrules" ]; then
  pass ".windsurfrules found"
else
  warn "No .windsurfrules in current directory" "Will be generated by the boilerplate prompt"
fi

# =============================================================================
# 7. DNS / NETWORK (DevIAC LAN)
# =============================================================================
header "7. DNS / Network (DevIAC LAN)"

if grep -q "crea-comm.loc" /etc/hosts 2>/dev/null; then
  pass "*.crea-comm.loc entries found in /etc/hosts"
else
  warn "No crea-comm.loc entries in /etc/hosts" \
    "Add if using DevIAC LAN: echo '127.0.0.1 mcp.crea-comm.loc docs.crea-comm.loc' | sudo tee -a /etc/hosts"
fi

# =============================================================================
# SUMMARY
# =============================================================================
header "PREFLIGHT SUMMARY"

echo ""
echo -e "  ${GREEN}Ready:${NC}          ${ready} checks passed"
echo -e "  ${RED}Action needed:${NC}  ${action} items require attention"
echo -e "  ${YELLOW}Optional:${NC}       ${optional} items are recommended but not blocking"
echo ""

if [ "$action" -gt 0 ]; then
  echo -e "  ${RED}Fix the action items above before running the master prompt.${NC}"
  echo ""
fi

echo -e "${BLUE}Recommended execution sequence:${NC}"
echo ""
echo "  1. Fix any ACTION NEEDED items above"
echo "  2. Start DevIAC gateway:  cd \$DEVIAC_PATH && make up-tanit"
echo "  3. Open Cursor in the target project directory"
echo "  4. Verify MCPs are connected in Cursor settings"
echo "  5. Open Agent mode"
echo "  6. Paste the master prompt from corpus-to-boilerplate/index.md"
echo "  7. Replace [TARGET_PATH], [APP_NAME], [PRODUCT_MODE]"
echo "  8. Execute and verify with Browser MCP"
echo ""
echo -e "${BLUE}Best tool:${NC} Cursor Agent mode (built-in Browser MCP, native MCP support, file generation)"
echo ""
